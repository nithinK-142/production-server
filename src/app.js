import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import { connectDB } from "./config/db.js";
import animeRoutes from "./routes/anime.routes.js";

import { requestLogger } from "./middlewares/logger.middleware.js";
import { responseHandler } from "./middlewares/response.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { logWithTimestamp } from "./utils/logger.js";

const app = express();

// ====================
// ⚙️ App Config
// ====================
app.set("trust proxy", true);

// ====================
// 🔐 Security
// ====================
app.use(
  helmet({
    contentSecurityPolicy: false // APIs don’t need CSP
  })
);

// ====================
// 🌐 CORS
// ====================
app.use(
  cors({
    origin: "*",
    methods: ["POST"]
  })
);

// ====================
// 📦 Body Parser
// ====================
app.use(express.json({ limit: "1mb" }));

// ====================
// 📊 Logging
// ====================
app.use(requestLogger);

// ====================
// ⚡ Compression
// ====================
app.use(
  compression({
    threshold: 1024 // only compress >1KB
  })
);

// ====================
// 📤 Response Wrapper
// ====================
app.use(responseHandler);

// ====================
// 🚏 Routes
// ====================
app.use("/api/anime", animeRoutes);

// ====================
// 404 Handler
// ====================
app.use((req, res) => {
  return res.status(200).json({
    success: false,
    message: "Route not found",
    data: {}
  });
});

// ====================
// 🚨 Error Handler
// ====================
app.use(errorHandler);

// ====================
// 🚀 Start Server
// ====================
const PORT = process.env.PORT || 1000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logWithTimestamp(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    logWithTimestamp("❌ Failed to start server", err);
    process.exit(1);
  }
};

startServer();