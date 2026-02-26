
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Helper function to check connection status
export function getConnectionStatus() {
  if (!mongoose.connection) return { isConnected: false, state: 'No connection' };
  
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const state = mongoose.connection.readyState;
  
  return {
    isConnected: state === 1,
    state: states[state] || 'unknown',
    readyState: state,
    database: mongoose.connection.name,
    host: mongoose.connection.host
  };
}

// import mongoose from 'mongoose';

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};

// async function connectToDatabase(): Promise<typeof mongoose> {
//   if (connection.isConnected) {
//     console.log('Already connected to the database');
//     return mongoose;
//   }

//   if (!process.env.MONGODB_URI) {
//     throw new Error('Please set the MONGODB_URI environment variable');
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI, {
//       // use unified topology & new url parser are default in newer mongoose
//     });

//     connection.isConnected = db.connections[0].readyState;
//     console.log('Database connection established', db.connection?.name || 'unknown');

//     return mongoose;
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     throw error;
//   }
// }

