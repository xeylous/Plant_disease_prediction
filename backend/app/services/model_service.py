"""
TensorFlow model service — singleton pattern.
Loads the Keras model ONCE at startup and reuses for all requests.
Optimized for Render Free tier (512 MB RAM).
"""

import os
import logging
import numpy as np

logger = logging.getLogger("leafiq")

# TF env flags MUST be set before first import
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"


class ModelService:
    """
    Singleton that wraps the Keras model.
    Auto-detects input shape so images are resized correctly.
    """

    _instance = None
    _model = None
    _input_shape: tuple[int, int] | None = None   # (H, W)

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    # ── loading ──────────────────────────────────────────────

    def load(self, model_path: str) -> None:
        """Load model from disk. Safe to call multiple times — skips if already loaded."""
        if self._model is not None:
            logger.info("Model already loaded — skipping.")
            return

        import tensorflow as tf

        # Minimize thread usage on free-tier
        tf.config.threading.set_intra_op_parallelism_threads(1)
        tf.config.threading.set_inter_op_parallelism_threads(1)

        logger.info(f"Loading model from {model_path} …")
        self._model = tf.keras.models.load_model(model_path, compile=False)

        # Detect input shape: could be (None, H, W, C) or [(None, H, W, C)]
        raw = self._model.input_shape
        if isinstance(raw, list):
            raw = raw[0]
        self._input_shape = (raw[1], raw[2])

        logger.info(f"✓ Model loaded  |  input {raw}  |  resize target {self._input_shape}")

    # ── properties ───────────────────────────────────────────

    @property
    def is_loaded(self) -> bool:
        return self._model is not None

    @property
    def input_size(self) -> tuple[int, int]:
        """(height, width) the model expects."""
        if self._input_shape is None:
            raise RuntimeError("Model not loaded yet.")
        return self._input_shape

    @property
    def full_input_shape(self) -> list:
        if self._model is None:
            return []
        s = self._model.input_shape
        return list(s[0]) if isinstance(s, list) else list(s)

    # ── inference ────────────────────────────────────────────

    def predict(self, image: np.ndarray) -> tuple[int, float]:
        """
        Run inference on a preprocessed (1, H, W, 3) array.
        Returns (class_index, confidence_percent).
        """
        if self._model is None:
            raise RuntimeError("Model not loaded.")

        preds = self._model.predict(image, verbose=0)
        idx = int(np.argmax(preds[0]))
        conf = float(np.max(preds[0])) * 100
        logger.info(f"Prediction: idx={idx}  conf={conf:.2f}%")
        return idx, round(conf, 2)


# ── Global singleton ──
model_service = ModelService()
