import pino from "pino";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, "../../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const transport = pino.transport({
  targets: [
    {
      target: "pino-roll",
      options: {
        file: path.join(logDir, "production-server.log"),
        frequency: "daily",
        dateFormat: "yyyy-MM-dd",
        size: "100m",
        maxFiles: 14,
        compress: true
      }
    }
  ]
});

export const logger = pino(
  {
    level: "info",
    timestamp: () => `,"time":"${new Date().toISOString()}"`
  },
  transport
);


export function getTimestamp() {
  const d = new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  let hh = d.getHours();
  const ampm = hh >= 12 ? 'PM' : 'AM';
  hh = hh % 12 || 12;

  const min = String(d.getMinutes()).padStart(2, '0');
  const sec = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');

  return `[${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}.${ms} ${ampm}]`;
}

export function logWithTimestamp(message, data = null) {
  if (typeof message === "object") {
    data = message;
    message = "LOG";
  }

  if (data) {
    logger.info({ msg: `${getTimestamp()} : ${message}`, ...data });
  } else {
    logger.info({ msg: `${getTimestamp()} : ${message}` });
  }
}