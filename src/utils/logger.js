import fs from "fs";
import path from "path";
import { createStream } from "rotating-file-stream";

const logDir = path.resolve("logs");

// ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// rotate daily
const accessLogStream = createStream("app.log", {
  interval: "1d",
  path: logDir,
  compress: "gzip",
  maxFiles: 9999999999
});

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

  let logLine;

  if (data !== null) {
    try {
      logLine = `${getTimestamp()} : ${message}\n${JSON.stringify(data, null, 2)}\n`;
    } catch {
      logLine = `${getTimestamp()} : ${message}\n[UNSERIALIZABLE DATA]\n`;
    }
  } else {
    logLine = `${getTimestamp()} : ${message}\n`;
  }
  
  // console output
  // process.stdout.write(logLine);

  // file output
  accessLogStream.write(logLine);
}