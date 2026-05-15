"""
Image preprocessing service.
Handles validation, resizing, and normalization for model inference.
Uses Pillow + NumPy only — no OpenCV dependency.
"""

import io
import logging
from PIL import Image
import numpy as np

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

    @staticmethod
    def preprocess(image_bytes: bytes, target_size: tuple[int, int]) -> np.ndarray:
        """
        Convert raw image bytes into a model-ready numpy array.

        Steps:
            1. Open from bytes with Pillow
            2. Convert to RGB (handles RGBA, L, P, etc.)
            3. Resize to (height, width) expected by the model
            4. Normalize to [0, 1] float32
            5. Add batch dimension → shape (1, H, W, 3)
        """
        try:
            image = Image.open(io.BytesIO(image_bytes))

            if image.mode != "RGB":
                image = image.convert("RGB")

            # target_size is (height, width) but PIL resize expects (width, height)
            image = image.resize((target_size[1], target_size[0]), Image.LANCZOS)

            img_array = np.array(image, dtype=np.float32) / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            logger.info(f"Preprocessed image: shape={img_array.shape}")
            return img_array

        except Exception as e:
            logger.error(f"Image preprocessing failed: {e}")
            raise ValueError(f"Could not process image: {e}")


# Global singleton
image_service = ImageService()
