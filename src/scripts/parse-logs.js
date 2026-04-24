import fs from "fs";
import readline from "readline";

const file = process.argv[2];

if (!file) {
  console.error("Usage: node parse-logs.js <log-file>");
  process.exit(1);
}

const outputFile = file.replace(/\.log$/, "") + "_parsed.log";
const writeStream = fs.createWriteStream(outputFile, { flags: "w" });

const rl = readline.createInterface({
  input: fs.createReadStream(file),
  crlfDelay: Infinity
});

let buffer = "";

rl.on("line", (line) => {

  line = line.trim();

  // skip empty
  if (!line) {
    return;
  }

  // JSON logs
  if (line.startsWith("{")) {
    processJsonLine(line);
    return;
  }

  // detect start of new log block
  if (line.startsWith("[")) {

    if (buffer) {
      processBlock(buffer);
    }

    buffer = line;
  } else {
    buffer += "\n" + line;
  }
});

rl.on("close", () => {

  if (buffer) {
    processBlock(buffer);
  }

  writeStream.end();
});

function write(line) {
  writeStream.write(line + "\n");
}

function processJsonLine(line) {
  try {
    const log = JSON.parse(line);

    // simple logs (Mongo connected etc)
    if (!log.id) {
      write(`${log.msg}`);
      return;
    }

    // request log
    write(`${log.msg} ${JSON.stringify({
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

  } catch (err) {
    write(`INVALID LINE: ${line}`);
  }
}

function processBlock(block) {

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

    write("=================================");
    write(`TIME: ${timestamp}`);
    write(`MSG : ${message}`);

    if (data) {
      write(`DATA: ${JSON.stringify(data, null, 2)}`);
    }

  } catch (err) {
    write("FAILED BLOCK:");
    write(block);
  }
}