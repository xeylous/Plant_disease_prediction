/**
 * Axios API client for the LeafIQ AI backend.
 */

import axios from "axios";
import type { PredictionResponse, HealthResponse } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 120000, // 2 min — Render free cold-starts can be slow
});

/**
 * Send a plant leaf image for disease prediction.
 */
export async function predictDisease(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<PredictionResponse>("/api/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/**
 * Check backend health status.
 */
export async function checkHealth(): Promise<HealthResponse> {
  const { data } = await api.get<HealthResponse>("/api/health");
  return data;
}
