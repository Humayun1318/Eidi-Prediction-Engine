// app/share/[id]/page.tsx
import { connectToDatabase } from "@/lib/db/mongodb";
import { Prediction } from "@/lib/db/models/Prediction";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getOverallEmotionalState } from "@/lib/emotionalDamage";
import { PredictionData, EmotionalState } from "@/lib/types";
import mongoose from "mongoose";
import ShareCard from "@/app/_components/ShareCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SharePage({ params }: PageProps) {
  const id = params.id;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectToDatabase();

  // Don't increment views here (API will handle that)
  const prediction = await Prediction.findById(id);

  if (!prediction) {
    notFound();
  }

  const predictionData: PredictionData = {
    id: prediction._id.toString(),
    predictions: prediction.predictions,
    totalPrediction: prediction.totalPrediction,
    luckFactor: prediction.luckFactor,
    relativesCount: prediction.relativesCount,
    createdAt: prediction.createdAt.toISOString(),
    views: prediction.views,
  };

  const emotionalState: EmotionalState = getOverallEmotionalState(
    predictionData.predictions.map((p) => ({
      id: 0,
      name: p.name,
      relation: p.relation,
      eidi2024: p.eidi2024,
      eidi2025: p.eidi2025,
      promised: p.promised,
    })),
    predictionData.totalPrediction,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Share Card */}
        <ShareCard
          prediction={predictionData}
          emotionalState={emotionalState}
        />

        {/* CTA */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold"
          >
            🔮 তোমার ভবিষ্যৎ দেখাও
          </Link>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          👁️ Viewed {predictionData.views} times
        </p>
      </div>
    </div>
  );
}
