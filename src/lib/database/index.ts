import { MONGO_URL } from "@/env";
import mongoose, { Mongoose } from "mongoose";

export type CachedConnection = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var mongoose: CachedConnection;
}

// Initialize cached
const cached = global.mongoose || { conn: null, promise: null };

if (!MONGO_URL) {
  console.log("Connection string not found");
}

export async function connectToDatabase() {
  // Check for exisiting connection
  if (cached.conn) return cached.conn;

  // If there is no promise, call mongoose.connect() and asign to conn.promise
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, {
        dbName: "onelga",
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 60000, // 60 seconds
      } as mongoose.ConnectOptions)
      .then((mongoose) => mongoose);

    cached.promise.catch((err) => {
      cached.promise = null;
      return err;
    });
  }
  try {
    // assign the current mongoose object to cached.conn
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    return error;
  }

  return cached.conn;
}
