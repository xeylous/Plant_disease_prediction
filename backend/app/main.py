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
from app.services.model_service import model_service
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
    """Load TF model in the background so it doesn't block server startup."""
    import asyncio
    settings = get_settings()
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    
    def _load_model_blocking():
        try:
            model_service.load(settings.model_path)
            logger.info("Model loaded successfully in background ✓")
        except Exception as e:
            logger.error(f"FATAL — model load failed: {e}")

    # Start model loading in a background thread so we can yield immediately
    # and let Uvicorn bind to the port. Render will see the port open immediately!
    loop = asyncio.get_running_loop()
    loop.run_in_executor(None, _load_model_blocking)
    
    logger.info("Background model loading started. Yielding to Uvicorn...")
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
    allow_origins=[
        settings.frontend_url,
        "http://localhost:3000",
        "http://localhost:3001",
    ],
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
