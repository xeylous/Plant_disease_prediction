"""
LeafIQ AI — FastAPI Application Entry Point.

• Loads the TF model once via lifespan context manager
• Registers CORS, exception handlers, and routers
• Serves Swagger docs at /docs
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import get_settings
from app.routes import predict, health
from app.middleware.error_handler import (
    http_exception_handler,
    validation_exception_handler,
    generic_exception_handler,
)

# ── Logging ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(name)-8s │ %(levelname)-7s │ %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("leafiq")


# ── Lifespan — load model once at startup ────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Start up the backend server."""
    settings = get_settings()
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Connected to remote HF model: {settings.hf_model_url}")
    yield  # app is running, port is bound!
    
    logger.info("Shutting down …")


# ── App factory ──────────────────────────────────────────────
settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="AI-powered plant disease detection & treatment recommendation API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── CORS ─────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Exception handlers ───────────────────────────────────────
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# ── Routers ──────────────────────────────────────────────────
app.include_router(predict.router)
app.include_router(health.router)


# ── Root redirect to docs ────────────────────────────────────
@app.get("/", tags=["Root"])
async def root():
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/api/health",
    }
