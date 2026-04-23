import { logWithTimestamp } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  logWithTimestamp({
    requestId: req.log?.id,
    message: err.message,
    stack: err.stack
  });

  return res.status(200).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: {}
  });
};