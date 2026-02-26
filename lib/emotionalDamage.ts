// lib/emotionalDamage.ts
import { Relative, Trend, EmotionalState } from "./types";

export const generateDramaMessage = (
  relative: Relative, 
  prediction: number, 
  trend: Trend
): string[] => {
  const messages: string[] = [];
  const name = relative.name;

  // Ghosting detection
  if (Number(relative.eidi2025) === 0) {
    messages.push(`💔 ${name}: Last seen 2:45 PM Eid day`);
    messages.push(`👻 Typing... stopped (since 2025)`);
  }

  // Promise vs Reality
  if (relative.promised && Number(relative.eidi2025) === 0) {
    messages.push(`🤡 Promise detected: "কাল দিচ্ছি" • 364 days ago`);
  }

  // Trend based
  if (trend.trend === "decreasing") {
    messages.push(`📉 ${name}: Financial downgrade (bought iPhone?)`);
  } else if (trend.trend === "increasing") {
    messages.push(`💰 ${name}: Rich uncle energy detected`);
  }

  // Prediction commentary
  if (prediction === 0) {
    messages.push(`💀 Prediction: 0 taka • Screenshot only`);
  } else if (prediction > 2000) {
    messages.push(
      `🎉 Prediction: ${prediction} taka • Sit beside him after Eid prayer`
    );
  }

  return messages.length > 0 ? messages : [`${name}: No drama... yet 😶`];
};

export const getOverallEmotionalState = (
  relatives: Relative[], 
  totalPrediction: number
): EmotionalState => {
  const ghostCount = relatives.filter((r) => Number(r.eidi2025) === 0).length;
  const promiseBreakers = relatives.filter(
    (r) => r.promised && Number(r.eidi2025) === 0
  ).length;

  if (totalPrediction === 0)
    return { state: "💀 BANKRUPT", color: "text-red-500", emoji: "😭" };
  if (ghostCount > 2)
    return { state: "👻 HAUNTED", color: "text-purple-400", emoji: "👻" };
  if (promiseBreakers > 1)
    return { state: "🤡 CLOWN WORLD", color: "text-yellow-400", emoji: "🤡" };
  if (totalPrediction > 10000)
    return { state: "💰 RICH UNCLE", color: "text-green-400", emoji: "🤑" };
  return { state: "😐 SURVIVAL MODE", color: "text-gray-400", emoji: "😐" };
};