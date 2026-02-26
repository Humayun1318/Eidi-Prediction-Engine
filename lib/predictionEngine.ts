// lib/predictionEngine.ts
import { Trend } from "./types";

export const analyzeTrend = (eidi2024: number | string, eidi2025: number | string): Trend => {
  const prev = Number(eidi2024);
  const curr = Number(eidi2025);

  if (prev === 0 && curr === 0)
    return { trend: "dead", emoji: "💀", message: "Ghosted permanently" };
  if (prev === 0 && curr > 0)
    return { trend: "new", emoji: "🆕", message: "New hope, new disappointment?" };
  if (prev > 0 && curr === 0)
    return { trend: "ghosted", emoji: "👻", message: "SEEN ZONE - Blocked?" };

  const diff = curr - prev;
  const percentChange = ((diff / prev) * 100).toFixed(0);

  if (diff > 0) {
    return {
      trend: "increasing",
      emoji: "📈",
      message: `${percentChange}% বেড়েছে (Rich uncle energy)`,
    };
  } else if (diff < 0) {
    return {
      trend: "decreasing",
      emoji: "📉",
      message: `${Math.abs(Number(percentChange))}% কমেছে (iPhone installment দোষ)`,
    };
  } else {
    return {
      trend: "stable",
      emoji: "📊",
      message: "Same as last year (Conservative family)",
    };
  }
};

export const predict2026 = (
  eidi2024: number | string, 
  eidi2025: number | string, 
  promised: boolean = false, 
  luckFactor: number = 1
): number => {
  const prev = Number(eidi2024);
  const curr = Number(eidi2025);

  // Base prediction logic
  let basePrediction: number;

  if (curr === 0) {
    // Ghosted case - random false hope
    basePrediction = Math.floor(Math.random() * 500);
  } else if (prev === 0) {
    // New giver - 80-150% of last year
    basePrediction = curr * (0.8 + Math.random() * 0.7);
  } else {
    const growthRate = (curr - prev) / prev;
    basePrediction = curr * (1 + growthRate);
  }

  // Apply promise bonus
  const promiseMultiplier = promised ? 1.2 : 1.0;

  // Apply luck factor (±10%)
  const finalPrediction = Math.floor(basePrediction * promiseMultiplier * luckFactor);

  return Math.max(0, finalPrediction);
};

export const calculateReliability = (eidi2024: number | string, eidi2025: number | string): { score: number; label: string; emoji: string } => {
  const prev = Number(eidi2024);
  const curr = Number(eidi2025);

  if (prev > 0 && curr > 0) return { score: 85, label: "Reliable", emoji: "✅" };
  if (prev > 0 && curr === 0) return { score: 15, label: "Ghost", emoji: "👻" };
  if (prev === 0 && curr > 0) return { score: 45, label: "Unpredictable", emoji: "🎲" };
  if (prev === 0 && curr === 0) return { score: 5, label: "Dead", emoji: "💀" };
  if (curr < prev) return { score: 60, label: "Shrinking", emoji: "📉" };
  if (curr > prev) return { score: 95, label: "Investor", emoji: "📈" };
  return { score: 50, label: "Unknown", emoji: "❓" };
};