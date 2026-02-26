// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { Prediction } from "@/lib/db/models/Prediction";
import { connectToDatabase, getConnectionStatus } from "@/lib/db/mongodb";



export async function GET() {
  try {
    console.log('🧪 Testing database connection...');
    
    // Try to connect
    const startTime = Date.now();
    const db = await connectToDatabase();
    console.log('✅ Database connection successful', db.connection?.name || 'unknown');
    const endTime = Date.now();
    // console.log('Connection time:', db);

    // Get connection status
    const status = getConnectionStatus();
    
    // Try to perform a simple operation
    let dbOperation = { success: false, message: '', time: 0 };
    try {
      const opStart = Date.now();
      // Just count documents (doesn't create anything)
      const count = await Prediction.countDocuments();
      const opEnd = Date.now();
      dbOperation = {
        success: true,
        message: `Found ${count} predictions in database`,
        time: opEnd - opStart
      };
    } catch (opError: any) {
      dbOperation = {
        success: false,
        message: opError.message,
        time: 0
      };
    }
    
    return NextResponse.json({
      success: true,
      connection: {
        ...status,
        connectionTime: `${endTime - startTime}ms`
      },
      database: {
        name: process.env.MONGODB_DB || 'eidi-prediction',
        uri: process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') // Hide credentials
      },
      operation: dbOperation,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ Database test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        name: error.name,
        message: error.message,
        code: error.code
      },
      hints: [
        'Check if MONGODB_URI is correct in .env.local',
        'Check if your IP is whitelisted in MongoDB Atlas',
        'Check if database user has correct permissions',
        'Check if cluster is running (not paused)'
      ],
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

