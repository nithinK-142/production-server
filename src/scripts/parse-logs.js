import fs from "fs";
import path from "path";
import readline from "readline";

const logsDir = path.resolve("logs");
const arg = process.argv[2];

if (arg === "--help" || arg === "-h") {
  console.log(`
Usage:

npm run parse -- <option>

Options:

  (no arg)           → parse latest log
  YYYY-MM-DD         → parse specific date
  -a, --all          → parse all logs
  -h, --help         → show this help

Examples:

  npm run parse
  npm run parse -- 2026-04-24
  npm run parse -- --all
`);
  process.exit(0);
}

// get all logs
function getAllLogs() {
  return fs.readdirSync(logsDir)
    .filter(f =>
      f.endsWith(".log") &&
      f.startsWith("production-server-") &&
      !f.includes("_parsed")
    )
    .sort();
}

// resolve files
let filesToProcess = [];
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

if (arg === "--all" || arg === "-a") {
  filesToProcess = getAllLogs();
} else if (arg) {
  if (!dateRegex.test(arg)) {
    console.error("Invalid argument:", arg);
    console.error("Expected format: YYYY-MM-DD or --all");
    process.exit(1);
  }

  const fileName = `production-server-${arg}.log`;
  const fullPath = path.join(logsDir, fileName);

  if (!fs.existsSync(fullPath)) {
    console.error("Log file not found:", fileName);
    process.exit(1);
  }

  filesToProcess = [fileName];
} else {
  const logs = getAllLogs().reverse();

  if (!logs.length) {
    console.error("No logs found");
    process.exit(1);
  }
  filesToProcess = [logs[0]];
}

// process each file
for (const fileName of filesToProcess) {
  const file = path.join(logsDir, fileName);
  const outputFile = file.replace(/\.log$/, "") + "_parsed.log";

  console.log("Parsing:", file);

  const writeStream = fs.createWriteStream(outputFile, { flags: "w" });

  const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
  });

  let buffer = "";

  rl.on("line", (line) => {
    line = line.trim();

  // skip empty
    if (!line) return;

    // JSON logs
    if (line.startsWith("{")) {
      processJsonLine(line, writeStream);
      return;
    }

    // detect start of new log block
    if (line.startsWith("[")) {
      if (buffer) processBlock(buffer, writeStream);
      buffer = line;
    } else {
      buffer += "\n" + line;
    }
  });

  rl.on("close", () => {
    if (buffer) processBlock(buffer, writeStream);
    writeStream.end();
  });
}

function write(stream, line) {
  stream.write(line + "\n");
}

function processJsonLine(line, stream) {
  try {
    const log = JSON.parse(line);

    // simple logs (Mongo connected etc)
    if (!log.id) {
      write(stream, `${log.msg}`);
      return;
    }

    // request log
    write(stream, `${log.msg} ${JSON.stringify({
      id: log.id,
      protocol: log.protocol,
      method: log.method,
      host: log.host,
      url: log.url,
      fullUrl: log.fullUrl,
      ip: log.ip,
      userAgent: log.userAgent,
      referer: log.referer,
      contentType: log.contentType,
      accept: log.accept,
      logs: log.logs,
      requestData: log.requestData,
      duration: log.duration,
      statusCode: log.statusCode,
      response: log.response
    }, null, 2)}`);

  } catch {
    write(stream, `INVALID LINE: ${line}`);
  }
}

function processBlock(block, stream) {

  try {
    const [firstLine, ...rest] = block.split("\n");

    const timestampMatch = firstLine.match(/^\[(.*?)\]/);
    const timestamp = timestampMatch ? timestampMatch[1] : "unknown";

    const message = firstLine.replace(/^\[.*?\]\s*:\s*/, "");

    let data = null;

    if (rest.length) {
      const rawJson = rest.join("\n");

      try {
        data = JSON.parse(rawJson);
      } catch {
        data = "[INVALID JSON]";
      }
    }

    write(stream, "=================================");
    write(stream, `TIME: ${timestamp}`);
    write(stream, `MSG : ${message}`);

    if (data) {
      write(stream, `DATA: ${JSON.stringify(data, null, 2)}`);
    }

  } catch {
    write(stream, "FAILED BLOCK:");
    write(stream, block);
  }
}