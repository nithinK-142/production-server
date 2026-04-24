import mongoose from "mongoose";
import { logWithTimestamp } from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const start = Date.now();
    await mongoose.connect("mongodb://127.0.0.1:27017/animeDB");
    const conn = mongoose.connection;
    const time = Date.now() - start;
    console.log(
      `✅ MongoDB Connected!
• Host: ${conn.host}
• PORT: ${conn.port}
• Database: ${conn.name}
• Ready State: ${conn.readyState} (1 = connected)
• Connection Time: ${time}ms`
    );
  } catch (err) {
    logWithTimestamp("❌ MongoDB Error", err.message);
    process.exit(1);
  }
};