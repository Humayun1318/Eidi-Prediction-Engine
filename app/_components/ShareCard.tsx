// app/components/ShareCard.tsx
"use client";

import { useRef } from "react";
import { PredictionData, EmotionalState } from "@/lib/types";

interface ShareCardProps {
  prediction: PredictionData;
  emotionalState: EmotionalState;
}

export default function ShareCard({
  prediction,
  emotionalState,
}: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    // In a real app, you'd use html2canvas to download as image
    alert("Download feature coming soon! 📸");
  };

  return (
    <div
      ref={cardRef}
      className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-6 border-4 border-yellow-400/50 shadow-2xl"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <span className="text-5xl block mb-2">🕵️</span>
        <h2 className="text-2xl font-black text-yellow-300">
          EIDI PREDICTION 2026
        </h2>
      </div>

      {/* Total */}
      <div className="bg-white/10 rounded-2xl p-4 mb-4 text-center">
        <p className="text-sm text-gray-300">Total Eidi</p>
        <p className="text-5xl font-black text-yellow-400">
          ৳{prediction.totalPrediction}
        </p>
      </div>

      {/* Emotional State */}
      <div className={`text-center mb-4 ${emotionalState.color}`}>
        <span className="text-2xl">{emotionalState.emoji}</span>
        <span className="text-lg font-bold ml-2">{emotionalState.state}</span>
      </div>

      {/* Top Relatives */}
      <div className="space-y-2 mb-4">
        <p className="text-xs text-gray-400">Top Drama:</p>
        {prediction.predictions.slice(0, 3).map((rel, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-sm bg-black/20 p-2 rounded"
          >
            <span>{rel.name}</span>
            <span className="font-bold text-pink-300">
              ৳{rel.predicted2026}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400">
        <p>🤡 কে দেবে · কে দেখাবে · কে ঘুমাবে</p>
        <p className="mt-1">eidi-prediction.vercel.app/share/{prediction.id}</p>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="w-full mt-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
      >
        📸 Save as image
      </button>
    </div>
  );
}
