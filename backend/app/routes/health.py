"""
/api/health — Lightweight health-check endpoint.
Returns model status, uptime, and cache info for monitoring.
"""

import time
import logging
from fastapi import APIRouter

from app.services.model_service import model_service
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
    return HealthResponse(
        status="healthy" if model_service.is_loaded else "degraded",
        model_loaded=model_service.is_loaded,
        model_input_shape=model_service.full_input_shape,
        uptime_seconds=round(time.time() - _start_time, 1),
        cache_size=gemini_cache.size,
        version=settings.app_version,
    )
