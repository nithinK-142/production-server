import mongoose from "mongoose";
import { logWithTimestamp } from "../utils/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/animeDB");
    logWithTimestamp("✅ MongoDB Connected");
  } catch (err) {
    logWithTimestamp("❌ MongoDB Error", err.message);
    process.exit(1);
  }
};