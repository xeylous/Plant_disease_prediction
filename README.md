# 🌿 LeafIQ — AI Plant Disease Detection

**AI-powered plant disease detection platform** that identifies 39 diseases across 14 crop species with instant treatment recommendations.

Built with TensorFlow, Google Gemini AI, FastAPI, and Next.js 15.

---

## ✨ Features

- 📸 **Instant Detection** — Upload a leaf photo, get AI diagnosis in seconds
- 🧠 **AI Treatment Plans** — Google Gemini generates detailed organic & chemical treatments
- 🎯 **39 Disease Classes** — Covers Apple, Tomato, Grape, Corn, Potato, and 9 more crops
- 📱 **Mobile Ready** — Fully responsive, works on any device
- 🌙 **Dark Mode** — Beautiful light and dark themes
- 📊 **Confidence Scoring** — See how confident the AI is in its diagnosis
- 📄 **Download Reports** — Export diagnosis as text report
- ⚡ **Optimized** — Runs on free-tier hosting (Render + Vercel)

---

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Next.js 15  │────▶│   FastAPI     │────▶│ TensorFlow  │
│  (Vercel)    │     │   (Render)    │     │   Model     │
└─────────────┘     └──────┬───────┘     └─────────────┘
                           │
                    ┌──────▼───────┐
                    │ Google Gemini │
                    │   (Free API)  │
                    └──────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git LFS (for model file)

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

# Create .env from example
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run backend
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local

# Run frontend
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🌍 Deployment

### Backend → Render (Free)

1. Create a **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Set **Root Directory**: `backend`
4. **Build Command**: `pip install -r requirements.txt`
5. **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables:
   - `GEMINI_API_KEY` = your key
   - `MODEL_PATH` = `model/plant_disease_recog_model_pwp.keras`
   - `FRONTEND_URL` = your Vercel URL

### Frontend → Vercel (Free)

1. Import project on [Vercel](https://vercel.com)
2. Set **Root Directory**: `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL
4. Deploy!

### Git LFS Setup (for model file)

```bash
git lfs install
git lfs track "*.keras"
git add .gitattributes
git add backend/model/plant_disease_recog_model_pwp.keras
git commit -m "Add model with LFS"
git push
```

---

## 📡 API Documentation

### `POST /api/predict`
Upload a plant leaf image for disease prediction.

**Request**: `multipart/form-data` with `file` field

**Response**:
```json
{
  "success": true,
  "prediction": "Tomato___Late_blight",
  "confidence": 98.4,
  "crop": "Tomato",
  "disease": "Late blight",
  "healthy": false,
  "ai_solution": {
    "overview": "...",
    "causes": ["..."],
    "symptoms": ["..."],
    "organic_treatment": ["..."],
    "chemical_treatment": ["..."],
    "prevention": ["..."],
    "severity": "High",
    "recovery_chance": "Moderate if treated early",
    "farmer_tips": ["..."]
  }
}
```

### `GET /api/health`
Check API health status.

---

## 🔧 Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Backend | Google Gemini API key |
| `MODEL_PATH` | Backend | Path to .keras model file |
| `FRONTEND_URL` | Backend | Frontend URL for CORS |
| `NEXT_PUBLIC_API_URL` | Frontend | Backend API URL |

---

## 🌾 Supported Crops & Diseases

Apple (4) · Blueberry (1) · Cherry (2) · Corn (4) · Grape (4) · Orange (1) · Peach (2) · Pepper (2) · Potato (3) · Raspberry (1) · Soybean (1) · Squash (1) · Strawberry (2) · Tomato (10)

---

## 📝 License

MIT License — free for personal and commercial use.

---

Built with 🌿 by LeafIQ Team
