const http = require("http");
const fs = require("fs");
require("dotenv").config();

http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/") {
    const path = __dirname + "/staticFiles/index.html"
    fs.readFile(path,(error,data) => {
        if(error) {
            console.log(error)
            response.statusCode(500)
            response.setHeader('Content-Type', 'text/html')
            res.end('Error occured while loading')
        }else{
            response.statusCode(200)
            response.setHeader('Content-Type', 'text/html')
            res.end(data)
        }
    })
  }else if(request.method === 'POST' && request.url === '/echo'){
      let result = ''
      request.on('data', function(chunk) {
          result += chunk.toString()
      })
      req.on('end', function(){
          res.statusCode(200)
          res.setHeader('Content-Type', 'application/json')
          res.end(result)
      })
  }else{
      res.end(<html><body><h1>404</h1></body></html>)
  }
}).listen(process.env.port)
