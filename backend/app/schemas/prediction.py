"""
Pydantic models for API request / response schemas.
"""

from pydantic import BaseModel
from typing import Optional


class AISolution(BaseModel):
    """Structured AI-generated treatment information from Gemini."""
    overview: str = ""
    causes: list[str] = []
    symptoms: list[str] = []
    organic_treatment: list[str] = []
    chemical_treatment: list[str] = []
    prevention: list[str] = []
    severity: str = ""
    recovery_chance: str = ""
    farmer_tips: list[str] = []


class PredictionResponse(BaseModel):
    """Complete prediction API response."""
    success: bool = True
    prediction: str = ""
    confidence: float = 0.0
    crop: str = ""
    disease: str = ""
    healthy: bool = False
    ai_solution: Optional[AISolution] = None


class HealthResponse(BaseModel):
    """Health check endpoint response."""
    status: str = "ok"
    model_loaded: bool = False
    model_input_shape: Optional[list] = None
    uptime_seconds: float = 0.0
    cache_size: int = 0
    version: str = "1.0.0"


class ErrorResponse(BaseModel):
    """Standardized error response."""
    success: bool = False
    error: str = ""
    detail: Optional[str] = None
