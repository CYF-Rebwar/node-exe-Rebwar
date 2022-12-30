const http = require("http");
const path = require("path");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h3>Home Page</h3>");
    return res.end();
  }
  if (req.url === "/about") {
    const filePath = path.resolve(__dirname, "about.html");
    const data = fs.readFileSync(filePath);
    console.log(data);
    return res.end(data);
  }
  res.statusCode = 404;
  return res.end("page not found");
});

server.listen(3000, () => {
  console.log("lesten in port 3000");
});
