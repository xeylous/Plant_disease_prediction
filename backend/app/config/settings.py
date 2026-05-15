"""
Application configuration using Pydantic Settings.
All environment variables and app constants are managed here.
"""

import os
from pydantic_settings import BaseSettings
from functools import lru_cache

# ── TensorFlow optimization flags (set before TF import anywhere) ──
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
# Strictly limit threads to prevent massive memory overhead on Render Free Tier
os.environ['OMP_NUM_THREADS'] = '1'
os.environ['TF_NUM_INTEROP_THREADS'] = '1'
os.environ['TF_NUM_INTRAOP_THREADS'] = '1'
# Prevent memory growth
os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'


class Settings(BaseSettings):
    """Central configuration loaded from environment variables."""

    # ── API Keys ──
    gemini_api_key: str = ""

    # ── Remote Model API ──
    hf_model_url: str = "https://xeylous-plant-disease-space.hf.space"
    hf_api_key: str = ""

    # ── CORS ──
    frontend_url: str = "https://plant-disease-prediction-khaki.vercel.app/"

    # ── Upload limits ──
    max_upload_size: int = 10 * 1024 * 1024  # 10 MB
    allowed_extensions: set = {"jpg", "jpeg", "png", "webp"}

    # ── App metadata ──
    app_name: str = "LeafIQ AI"
    app_version: str = "1.0.0"

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Return cached settings singleton."""
    return Settings()
