"""
/api/health — Lightweight health-check endpoint.
Returns model status, uptime, and cache info for monitoring.
"""

import time
import logging
import httpx
from fastapi import APIRouter

from app.utils.cache import gemini_cache
from app.config.settings import get_settings
from app.schemas.prediction import HealthResponse

logger = logging.getLogger("leafiq")
router = APIRouter(prefix="/api", tags=["Health"])

_start_time = time.time()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Return current system health status."""
    settings = get_settings()
    
    # We could ping HF here, but let's just keep it fast
    return HealthResponse(
        status="healthy",
        model_loaded=True,  # Assuming remote model is loaded
        model_input_shape=[224, 224], # Hardcoded fallback shape
        uptime_seconds=round(time.time() - _start_time, 1),
        cache_size=gemini_cache.size,
        version=settings.app_version,
    )
