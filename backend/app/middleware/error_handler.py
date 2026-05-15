"""
Global exception handlers for the FastAPI application.
Returns consistent JSON error responses for all exception types.
"""

import logging
import traceback
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

logger = logging.getLogger("leafiq")


async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions (4xx, 5xx) with structured JSON."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error": exc.detail, "detail": None},
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle Pydantic / request validation errors."""
    errors = exc.errors()
    message = "; ".join([f"{e['loc'][-1]}: {e['msg']}" for e in errors])
    return JSONResponse(
        status_code=422,
        content={"success": False, "error": "Validation error", "detail": message},
    )


async def generic_exception_handler(request: Request, exc: Exception):
    """Catch-all for unexpected server errors."""
    logger.error(f"Unhandled exception: {exc}")
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "detail": "An unexpected error occurred. Please try again.",
        },
    )
