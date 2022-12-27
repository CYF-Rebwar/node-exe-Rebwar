const Stream = require("node:stream");
const Buffer = require("node:buffer").Buffer;

const fs = require("node:fs");
const path = require("path");

const result = [];
const writableStream = new Stream.Writable({
  write(chunk, encoding, next) {
    result.push(chunk);
    next();
  },
});

const readableStream = new Stream.Readable({
  read() {},
});
readableStream.pipe(writableStream);

readableStream.on("close", () => writableStream.end());
writableStream.on("close", () => {
  console.log("Writable stream ended!");
  const newFilePath = path.resolve(__dirname, "image-copy.jpg");
  //   console.log(Buffer.concat(result));
  fs.writeFileSync(newFilePath, Buffer.concat(result));
});

const filePath1 = path.join(__dirname, "2-file.js");
const filePath = path.resolve(__dirname, "image.jpg");

const data = fs.readFileSync(filePath);

const chunkSize = 2 ** 10; // 1024 = 2**10
const chunks = Math.ceil(data.length / chunkSize);
const chunkCount = parseInt(data.length / chunkSize) + 1; // parseInt() is used to get the integer number from the number so remove the decimal number

for (let i = 0; i < chunkCount; i++) {
  const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);

  readableStream.push(chunk);
}

readableStream.destroy();
