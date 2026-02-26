
export interface Relative {
  id: number;
  name: string;
  relation: string;
  eidi2024: number | string;
  eidi2025: number | string;
  promised: boolean;
}

export interface Trend {
  trend: 'increasing' | 'decreasing' | 'stable' | 'ghosted' | 'dead' | 'new';
  emoji: string;
  message: string;
}

export interface PredictionResult {
  id?: string;
  name: string;
  relation: string;
  eidi2024: number;
  eidi2025: number;
  promised: boolean;
  trend: Trend;
  predicted2026: number;
  drama: string[];
  reliability: string;
}

export interface PredictionData {
  id: string;
  predictions: PredictionResult[];
  totalPrediction: number;
  luckFactor: number;
  relativesCount: number;
  createdAt: string;
  views: number;
}

export interface EmotionalState {
  state: string;
  color: string;
  emoji: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}