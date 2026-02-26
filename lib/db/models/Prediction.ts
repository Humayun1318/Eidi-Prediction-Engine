// lib/db/models/Prediction.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { PredictionData, PredictionResult } from '../../types';

export interface IPrediction extends Document {
  predictions: PredictionResult[];
  totalPrediction: number;
  luckFactor: number;
  relativesCount: number;
  createdAt: Date;
  views: number;
}

const TrendSchema = new Schema({
  trend: { type: String, required: true },
  emoji: { type: String, required: true },
  message: { type: String, required: true },
}, { _id: false });

const PredictionResultSchema = new Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  eidi2024: { type: Number, required: true },
  eidi2025: { type: Number, required: true },
  promised: { type: Boolean, default: false },
  trend: { type: TrendSchema, required: true },
  predicted2026: { type: Number, required: true },
  drama: [{ type: String }],
  reliability: { type: String, required: true },
}, { _id: false });

const PredictionSchema = new Schema({
  predictions: [PredictionResultSchema],
  totalPrediction: { type: Number, required: true },
  luckFactor: { type: Number, required: true },
  relativesCount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

// Index for faster queries
PredictionSchema.index({ createdAt: -1 });

export const Prediction: Model<IPrediction> = mongoose.models.Prediction || 
  mongoose.model<IPrediction>('Prediction', PredictionSchema);