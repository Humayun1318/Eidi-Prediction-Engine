// app/api/share/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Prediction } from "@/lib/db/models/Prediction";
import { PredictionData } from "@/lib/types";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    console.log("Received request for prediction ID:", id);

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid prediction ID 😭", success: false },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find and update view count atomically
    const prediction = await Prediction.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!prediction) {
      return NextResponse.json(
        { error: "Prediction not found 😭", success: false },
        { status: 404 }
      );
    }

    // Transform to PredictionData type
    const predictionData: PredictionData = {
      id: prediction._id.toString(),
      predictions: prediction.predictions,
      totalPrediction: prediction.totalPrediction,
      luckFactor: prediction.luckFactor,
      relativesCount: prediction.relativesCount,
      createdAt: prediction.createdAt.toISOString(),
      views: prediction.views,
    };

    return NextResponse.json({
      success: true,
      data: predictionData,
    });
  } catch (error) {
    console.error("Share error:", error);
    return NextResponse.json(
      { error: "কিছু একটা সমস্যা হইছে 😭", success: false },
      { status: 500 }
    );
  }
}