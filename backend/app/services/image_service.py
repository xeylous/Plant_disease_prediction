"""
Image preprocessing service.
Handles validation, resizing, and normalization for model inference.
"""

import io
import logging

logger = logging.getLogger("leafiq")

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


class ImageService:
    """Validates and preprocesses uploaded images for TensorFlow inference."""

    @staticmethod
    def validate(content_type: str | None, file_size: int) -> tuple[bool, str]:
        """Check content type and file size."""
        if content_type not in ALLOWED_CONTENT_TYPES:
            return False, f"Unsupported file type: {content_type}. Use JPG, PNG, or WEBP."
        if file_size > MAX_FILE_SIZE:
            size_mb = round(file_size / (1024 * 1024), 1)
            return False, f"File too large ({size_mb} MB). Maximum is 10 MB."
        return True, ""


# Global singleton
image_service = ImageService()
