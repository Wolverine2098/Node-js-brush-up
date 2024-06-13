const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: new req recieved at ${req.url} \n`;
  fs.appendFile("log.txt", log, (err) => {});

  switch (req.url) {
    case "/":
      res.end("hello from server");
      break;
    case "/about":
      res.end("This is about page");
      break;
    default:
      res.end("page not found");
  }
});

myServer.listen(8000, () => {
  console.log("server started");
});
