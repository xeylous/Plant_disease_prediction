import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.security import APIKeyHeader
import numpy as np
from PIL import Image
import io

# ── TF Optimization (Set before TF import) ──
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
os.environ['OMP_NUM_THREADS'] = '2'
os.environ['TF_NUM_INTEROP_THREADS'] = '2'
os.environ['TF_NUM_INTRAOP_THREADS'] = '2'

logger = logging.getLogger("hf_model")
logging.basicConfig(level=logging.INFO)

API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# Model configuration
MODEL_PATH = "model/plant_disease_recog_model_pwp.keras"
_model = None
_input_shape = None

def get_expected_api_key():
    return os.environ.get("HF_API_KEY", "")

async def verify_api_key(api_key: str = Depends(api_key_header)):
    expected = get_expected_api_key()
    if expected and api_key != expected:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key

@asynccontextmanager
async def lifespan(app: FastAPI):
    global _model, _input_shape
    logger.info("Loading TensorFlow model...")
    import tensorflow as tf
    try:
        _model = tf.keras.models.load_model(MODEL_PATH, compile=False)
        raw = _model.input_shape
        if isinstance(raw, list):
            raw = raw[0]
        _input_shape = (raw[1], raw[2])
        logger.info(f"Model loaded successfully. Input shape: {_input_shape}")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
    yield
    logger.info("Shutting down...")

app = FastAPI(lifespan=lifespan)

@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": _model is not None}

@app.post("/predict_model")
async def predict_model(file: UploadFile = File(...), api_key: str = Depends(verify_api_key)):
    global _model, _input_shape
    if _model is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        if image.mode != "RGB":
            image = image.convert("RGB")
        image = image.resize((_input_shape[1], _input_shape[0]))
        img_array = np.array(image, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        preds = _model.predict(img_array, verbose=0)
        idx = int(np.argmax(preds[0]))
        conf = float(np.max(preds[0])) * 100
        
        return {
            "success": True,
            "class_idx": idx,
            "confidence": round(conf, 2)
        }
    except Exception as e:
        logger.error(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
