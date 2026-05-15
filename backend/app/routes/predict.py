"""
/api/predict — Plant disease prediction endpoint.
Accepts an image upload, runs inference, and returns AI-generated treatment info.
"""

import logging
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.image_service import image_service
from app.services.model_service import model_service
from app.services.gemini_service import get_ai_solution
from app.utils.class_labels import CLASS_LABELS, parse_class_label
from app.schemas.prediction import PredictionResponse

logger = logging.getLogger("leafiq")
router = APIRouter(prefix="/api", tags=["Prediction"])


@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(file: UploadFile = File(...)):
    """
    Upload a plant leaf image and receive:
      - disease prediction with confidence
      - AI-generated treatment & prevention info
    """
    # ── 1. Validate file ──
    contents = await file.read()
    valid, msg = image_service.validate(file.content_type, len(contents))
    if not valid:
        raise HTTPException(status_code=400, detail=msg)

    # ── 2. Preprocess image ──
    try:
        target_size = model_service.input_size  # (H, W)
        processed = image_service.preprocess(contents, target_size)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # ── 3. Run TF inference ──
    try:
        class_idx, confidence = model_service.predict(processed)
    except Exception as e:
        logger.error(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail="Model inference failed.")

    # ── 4. Map index to label ──
    if class_idx < 0 or class_idx >= len(CLASS_LABELS):
        raise HTTPException(status_code=500, detail="Prediction index out of range.")

    raw_label = CLASS_LABELS[class_idx]
    info = parse_class_label(raw_label)

    # ── 5. Get Gemini AI solution ──
    ai_solution = await get_ai_solution(
        crop=info["crop"],
        disease=info["disease"],
        is_healthy=info["healthy"],
    )

    # ── 6. Return response ──
    return PredictionResponse(
        success=True,
        prediction=raw_label,
        confidence=confidence,
        crop=info["crop"],
        disease=info["disease"],
        healthy=info["healthy"],
        ai_solution=ai_solution,
    )
