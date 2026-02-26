// app/api/predict/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Prediction } from "@/lib/db/models/Prediction";
import {
  analyzeTrend,
  predict2026,
} from "@/lib/predictionEngine";
import { generateDramaMessage } from "@/lib/emotionalDamage";
import { Relative, PredictionResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { relatives } = body as { relatives: Relative[] };

    if (!relatives || !Array.isArray(relatives) || relatives.length === 0) {
      return NextResponse.json(
        { error: "কমপক্ষে ১ জন relative দিতে হবে 😭", success: false },
        { status: 400 }
      );
    }

    // Generate luck factor (0.9 to 1.1)
    const luckFactor = 0.9 + Math.random() * 0.2;

    // Process each relative
    const predictions: PredictionResult[] = relatives.map((rel) => {
      const trend = analyzeTrend(rel.eidi2024, rel.eidi2025);
      const predicted = predict2026(
        rel.eidi2024,
        rel.eidi2025,
        rel.promised || false,
        luckFactor
      );
      const drama = generateDramaMessage(rel, predicted, trend);

      return {
        name: rel.name,
        relation: rel.relation,
        eidi2024: Number(rel.eidi2024),
        eidi2025: Number(rel.eidi2025),
        promised: rel.promised || false,
        trend,
        predicted2026: predicted,
        drama,
        reliability:
          trend.trend === "ghosted" ? "👻" : trend.trend === "increasing" ? "✅" : "⚠️",
      };
    });

    // Calculate total
    const totalPrediction = predictions.reduce(
      (sum, rel) => sum + rel.predicted2026,
      0
    );

    // Connect to MongoDB
    await connectToDatabase();

    // Save to MongoDB
    const predictionDoc = await Prediction.create({
      predictions,
      totalPrediction,
      luckFactor: Number(luckFactor.toFixed(2)),
      relativesCount: relatives.length,
      createdAt: new Date(),
      views: 0,
    });

    return NextResponse.json({
      success: true,
      id: predictionDoc._id.toString(),
      predictions,
      totalPrediction,
      luckFactor: Number(luckFactor.toFixed(2)),
    });
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "কিছু একটা সমস্যা হইছে 😭", success: false },
      { status: 500 }
    );
  }
}