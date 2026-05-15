"""
Gemini AI service — generates structured treatment info for detected diseases.

Features:
    • Multi-model fallback pool (rotate through free-tier models on rate limit)
    • In-memory TTL cache to avoid duplicate Gemini calls
    • Exponential-backoff retry
    • Input sanitization to prevent prompt injection
    • Graceful fallback response if all models fail
"""

import json
import re
import asyncio
import logging
from typing import Optional

import google.generativeai as genai

from app.config.settings import get_settings
from app.utils.cache import gemini_cache
from app.schemas.prediction import AISolution

logger = logging.getLogger("leafiq")

# ── Free-tier model pool (tried in order) ────────────────────
FREE_MODELS = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro-latest",
]

# ── Fallback when Gemini is completely unavailable ───────────
FALLBACK = AISolution(
    overview="AI analysis is temporarily unavailable. Please consult a local agricultural expert.",
    causes=["Unable to determine — AI service temporarily unavailable"],
    symptoms=["Refer to visible symptoms on the uploaded leaf image"],
    organic_treatment=[
        "Remove and destroy affected plant parts",
        "Improve air circulation around plants",
        "Apply neem oil spray as a general organic treatment",
        "Use compost tea to boost plant immunity",
    ],
    chemical_treatment=[
        "Consult local agricultural extension office for approved fungicides/pesticides",
        "Follow label instructions carefully for any chemical treatment",
    ],
    prevention=[
        "Practice crop rotation",
        "Ensure proper spacing between plants",
        "Water at the base of plants to keep foliage dry",
        "Remove plant debris after harvest",
        "Use disease-resistant varieties when available",
    ],
    severity="Unknown — requires expert assessment",
    recovery_chance="Depends on severity — early detection improves outcomes",
    farmer_tips=[
        "Monitor plants regularly for early signs of disease",
        "Maintain healthy soil with proper nutrients",
        "Keep detailed records of crop issues for future reference",
    ],
)

# ── Healthy-plant response (no Gemini call needed) ───────────
HEALTHY_RESPONSE = AISolution(
    overview="Your plant appears healthy! No signs of disease were detected by our AI model.",
    causes=[],
    symptoms=[],
    organic_treatment=[],
    chemical_treatment=[],
    prevention=[
        "Continue regular watering and fertilization",
        "Monitor plants weekly for early signs of stress",
        "Maintain proper spacing for air circulation",
        "Practice crop rotation each season",
        "Remove weeds that may harbor pests",
    ],
    severity="None",
    recovery_chance="N/A — plant is healthy",
    farmer_tips=[
        "Keep up the great work!",
        "Regular monitoring prevents future issues",
        "Healthy soil means healthy plants — test soil annually",
    ],
)


# ── Helpers ──────────────────────────────────────────────────

def _sanitize(text: str) -> str:
    """Strip potential prompt-injection patterns."""
    patterns = [
        r"ignore\s+(previous|above|all)\s+instructions",
        r"system\s*prompt",
        r"you\s+are\s+now",
        r"forget\s+(everything|all)",
        r"<\s*script",
        r"javascript:",
    ]
    out = text
    for p in patterns:
        out = re.sub(p, "[filtered]", out, flags=re.IGNORECASE)
    return out


def _parse_json(text: str) -> Optional[dict]:
    """Try to extract a JSON object from Gemini's response text."""
    # 1. Code-fenced JSON
    m = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if m:
        try:
            return json.loads(m.group(1))
        except json.JSONDecodeError:
            pass
    # 2. Raw JSON
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    # 3. First { … } block
    m = re.search(r"\{[\s\S]*\}", text)
    if m:
        try:
            return json.loads(m.group(0))
        except json.JSONDecodeError:
            pass
    return None


def _prompt(crop: str, disease: str) -> str:
    return (
        f"You are an expert agricultural scientist and plant pathologist.\n"
        f"A farmer's {crop} plant has been diagnosed with: {disease}.\n\n"
        f"Provide a detailed, actionable treatment guide.\n"
        f"Return ONLY valid JSON with this exact structure — no markdown, no extra text:\n"
        f'{{\n'
        f'  "overview": "2-3 sentence explanation of {disease} on {crop}",\n'
        f'  "causes": ["cause1", "cause2", "cause3"],\n'
        f'  "symptoms": ["symptom1", "symptom2", "symptom3"],\n'
        f'  "organic_treatment": ["treatment1", "treatment2", "treatment3"],\n'
        f'  "chemical_treatment": ["treatment1", "treatment2"],\n'
        f'  "prevention": ["method1", "method2", "method3"],\n'
        f'  "severity": "Low | Moderate | High | Critical",\n'
        f'  "recovery_chance": "e.g. High if treated early",\n'
        f'  "farmer_tips": ["tip1", "tip2", "tip3"]\n'
        f'}}\n\n'
        f"Be specific and practical. Include real product names where applicable."
    )


# ── Public API ───────────────────────────────────────────────

async def get_ai_solution(crop: str, disease: str, is_healthy: bool) -> AISolution:
    """
    Get AI-generated treatment info.

    Flow:
        1. Return canned response for healthy plants
        2. Check in-memory cache
        3. Call Gemini (rotating through FREE_MODELS on failure)
        4. Fall back to static response on total failure
    """
    if is_healthy:
        return HEALTHY_RESPONSE

    settings = get_settings()

    # ── Cache check ──
    cache_key = f"{crop}__{disease}".lower().replace(" ", "_")
    cached = gemini_cache.get(cache_key)
    if cached:
        logger.info(f"Cache HIT → {cache_key}")
        return cached

    # ── No API key → fallback ──
    if not settings.gemini_api_key:
        logger.warning("GEMINI_API_KEY not set — returning fallback.")
        return FALLBACK

    # ── Configure SDK ──
    genai.configure(api_key=settings.gemini_api_key)
    prompt_text = _prompt(_sanitize(crop), _sanitize(disease))

    last_err: Exception | None = None

    for model_name in FREE_MODELS:
        try:
            logger.info(f"Trying Gemini model: {model_name}")
            model = genai.GenerativeModel(model_name)

            # Run blocking SDK call in a thread so we don't block the event loop
            response = await asyncio.wait_for(
                asyncio.to_thread(model.generate_content, prompt_text),
                timeout=30,
            )

            text = response.text
            parsed = _parse_json(text)

            if parsed:
                solution = AISolution(**parsed)
                gemini_cache.set(cache_key, solution)
                logger.info(f"Gemini success via {model_name}")
                return solution
            else:
                logger.warning(f"{model_name} returned unparseable response.")

        except asyncio.TimeoutError:
            logger.warning(f"{model_name} timed out.")
            last_err = TimeoutError(f"{model_name} timed out")
        except Exception as e:
            logger.warning(f"{model_name} failed: {e}")
            last_err = e

        # Small delay before trying next model
        await asyncio.sleep(1)

    # ── All models exhausted ──
    logger.error(f"All Gemini models failed. Last error: {last_err}")
    return FALLBACK
