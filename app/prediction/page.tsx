// app/prediction/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOverallEmotionalState } from "@/lib/emotionalDamage";
import { PredictionData, EmotionalState } from "@/lib/types";

function PredictionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    const fetchPrediction = async () => {
      try {
        const response = await fetch(`/api/share/${id}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Something went wrong");
        }

        setPrediction(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "কিছু একটা সমস্যা হইছে");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🔮</div>
          <h2 className="text-2xl font-bold mb-2">
            Calculating your Eid destiny...
          </h2>
          <p className="text-gray-400">Analyzing 2 years of betrayal</p>
          <div className="mt-4 w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !prediction) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😭</div>
          <h2 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 mb-4">
            {error || "Prediction not found"}
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold inline-block"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const emotionalState: EmotionalState = getOverallEmotionalState(
    prediction.predictions.map((p) => ({
      id: 0,
      name: p.name,
      relation: p.relation,
      eidi2024: p.eidi2024,
      eidi2025: p.eidi2025,
      promised: p.promised,
    })),
    prediction.totalPrediction,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-8 relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite]"></div>
      <div className="absolute top-[30%] right-[15%] w-1 h-1 bg-white rounded-full animate-[twinkle_4s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[25%] left-[10%] w-1 h-1 bg-white rounded-full animate-[twinkle_5s_ease-in-out_infinite]"></div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-2">
            <span className="text-4xl">🕵️</span>
          </Link>
          <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-300 to-pink-400 text-transparent bg-clip-text">
            YOUR EIDI 2026
          </h1>
          <p className={`text-sm mt-1 ${emotionalState.color}`}>
            {emotionalState.emoji} {emotionalState.state} {emotionalState.emoji}
          </p>
        </div>

        {/* Total Card */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 mb-6 border-2 border-yellow-400/30 text-center backdrop-blur-sm">
          <p className="text-sm text-gray-300 mb-1">Total Predicted Eidi</p>
          <p className="text-5xl font-black text-yellow-400">
            ৳{prediction.totalPrediction}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Luck Factor: {prediction.luckFactor}x
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {prediction.relativesCount} জন relative বিশ্লেষিত
          </p>
        </div>

        {/* Relatives List */}
        <div className="space-y-4 mb-6">
          <h2 className="font-bold flex items-center gap-2">
            <span>📋</span> Breakdown by Relative
          </h2>

          {prediction.predictions.map((rel, idx) => (
            <div
              key={idx}
              className="bg-white/5 rounded-xl p-4 border border-gray-700 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{rel.name}</h3>
                  <p className="text-xs text-gray-400">{rel.relation}</p>
                </div>
                <span className="text-2xl">{rel.trend.emoji}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3 text-center text-sm">
                <div className="bg-gray-800/50 p-2 rounded">
                  <div className="text-xs text-gray-400">২০২৪</div>
                  <div>৳{rel.eidi2024}</div>
                </div>
                <div className="bg-gray-800/50 p-2 rounded">
                  <div className="text-xs text-gray-400">২০২৫</div>
                  <div>৳{rel.eidi2025}</div>
                </div>
                <div className="bg-pink-900/50 p-2 rounded border border-pink-500/30">
                  <div className="text-xs text-pink-300">২০২৬</div>
                  <div className="font-bold">৳{rel.predicted2026}</div>
                </div>
              </div>

              {/* Drama Messages */}
              <div className="space-y-1">
                {rel.drama.map((msg, i) => (
                  <p
                    key={i}
                    className="text-xs text-gray-300 flex items-start gap-1"
                  >
                    <span>{msg.split(" ")[0]}</span>
                    <span>{msg.substring(msg.indexOf(" ") + 1)}</span>
                  </p>
                ))}
              </div>

              {/* Promise indicator */}
              {rel.promised && (
                <div className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
                  <span>🤝</span> Promised this year
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-1 py-3 bg-gray-700 rounded-xl font-semibold text-center hover:bg-gray-600 transition-colors"
          >
            ← নতুন ডাটা
          </Link>
          <button
            onClick={() => {
              const shareUrl = `${window.location.origin}/share/${id}`;
              navigator.clipboard.writeText(shareUrl);
              alert("Share link copied! 📋");
            }}
            className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span>📤</span>
            Share
          </button>
        </div>

        {/* View count */}
        <p className="text-center text-xs text-gray-500 mt-4">
          👁️ Viewed {prediction.views} times •{" "}
          {new Date(prediction.createdAt).toLocaleDateString()}
        </p>

        <p className="text-center text-xs text-gray-500 mt-2">
          * Prediction based on 2 years data + luck • Results may vary
        </p>
      </div>
    </div>
  );
}

export default function PredictionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-spin">🔮</div>
            <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          </div>
        </div>
      }
    >
      <PredictionContent />
    </Suspense>
  );
}
