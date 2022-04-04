const http = require("http");
const fs = require("fs");
const { resolveSoa } = require("dns");
require("dotenv").config();

http
  .createServer((request, response) => {
    if (request.method === "GET" && request.url === "/") {
      const path = __dirname + "/staticFiles/index.html";
      fs.readFile(path, (error, data) => {
        if (error) {
          console.log(error);
          response.statusCode = 500;
          response.setHeader("Content-Type", "text/html");
          response.end("Error occured while loading");
        } else {
          response.statusCode = 200;
          response.setHeader("Content-Type", "text/html");
          response.end(data);
        }
      });
    } else if (request.method === "POST" && request.url === "/echo") {
      let result = "";
      request.on("data", function (chunk) {
        result += chunk.toString();
      });
      request.on("end", function () {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(result);
      });
    } else {
      response.end("<html><body><h1>404 Not Found</h1></body></html>");
    }
  })
  .listen(process.env.PORT || 8080);
