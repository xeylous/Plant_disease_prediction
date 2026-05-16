/**
 * TypeScript interfaces for the GreenScan AI platform.
 */

export interface AISolution {
  overview: string;
  causes: string[];
  symptoms: string[];
  organic_treatment: string[];
  chemical_treatment: string[];
  prevention: string[];
  severity: string;
  recovery_chance: string;
  farmer_tips: string[];
}

export interface PredictionResponse {
  success: boolean;
  prediction: string;
  confidence: number;
  crop: string;
  disease: string;
  healthy: boolean;
  ai_solution: AISolution | null;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  model_input_shape: number[] | null;
  uptime_seconds: number;
  cache_size: number;
  version: string;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  result: PredictionResponse;
}
