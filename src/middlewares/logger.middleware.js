import { getTimestamp, logWithTimestamp } from "../utils/logger.js";
import { sanitizeInput } from "../utils/sanitize-input.js";

export const requestLogger = (req, res, next) => {
  const incomingId = req.headers["x-request-id"];

  const requestId =
    incomingId && typeof incomingId === "string" && incomingId.length < 100
      ? incomingId
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const start = process.hrtime.bigint();

  req.log = {
    id: requestId,
    requestReachedServerAt: getTimestamp(),
    protocol: req.headers["x-forwarded-proto"] || req.protocol,
    method: req.method,
    host: req.headers.host,
    url: req.originalUrl,
    fullUrl: `${req.headers["x-forwarded-proto"] || req.protocol}://${req.headers.host}${req.originalUrl}`,
    ip: req.headers["x-forwarded-for"] || req.ip,
    userAgent: req.headers["user-agent"],
    referer: req.headers["referer"] || null,
    contentType: req.headers["content-type"] || null,
    origin: req.headers["origin"],
    accept: req.headers["accept"],
    logs: []
  };

  req.log.requestData = {};

  // params
  if (Object.keys(req.params || {}).length) {
    req.log.requestData.params = req.params;
  }

  // query
  if (Object.keys(req.query || {}).length) {
    req.log.requestData.query = req.query;
  }

  // body (sanitized + size check)
  if (req.body && Object.keys(req.body).length) {
    const bodyStr = JSON.stringify(req.body);

    if (bodyStr.length > 2000) {
      req.log.requestData.body = "[BODY TOO LARGE]";
    } else {
      req.log.requestData.body = sanitizeInput(req.body);
    }
  }

  const oldSend = res.send;
  res.send = function (body) {
    try {
      const str = typeof body === "string" ? body : JSON.stringify(body);
      const parsed = typeof body === "string" ? JSON.parse(body) : body;

      // derive status directly
      if (parsed && typeof parsed.success === "boolean") {
        res._statusLabel = parsed.success ? "success" : "fail";
      } else {
        res._statusLabel = "unknown";
      }

      // capture size
      res._contentLength = Buffer.byteLength(str);

      // capture response
      const MAX_LOG_SIZE = 5000;
      res._responseMeta = str.length > MAX_LOG_SIZE ? "[RESPONSE TOO LARGE]" : parsed;
    } catch (err) {
      res._statusLabel = "unknown";
      res._contentLength = 0;
      res._responseMeta = "[UNPARSEABLE RESPONSE]";
    }
    return oldSend.call(this, body);
  };

  res.setHeader("x-request-id", requestId);

  req.log.logs.push(`${getTimestamp()} : Request received`);

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    req.log.duration = Number(end - start) / 1e6;
    req.log.statusCode = res.statusCode;
    req.log.response = res._responseMeta;

    const logLine = `${req.method} | ${res.statusCode} | ${res._statusLabel} | ${res._contentLength || 0} bytes | ${req.log.duration.toFixed(3)} ms | ${req.originalUrl}`;

    logWithTimestamp({ id: req.log.id, ...req.log });
    logWithTimestamp(logLine);
  });

  next();
};