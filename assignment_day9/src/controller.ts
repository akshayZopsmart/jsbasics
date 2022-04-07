const http = require('http');
const url = require('url');
require('dotenv').config();
const service = require('./service')
module.exports = http.createServer(function (request : any, response : any){
    const reqURL = url.parse(request.url, true);
    if(request.method === 'GET' && reqURL.pathname === '/todos'){
        service.getAllTodos(request,response);
    }
    else if(
       request.url.match(/\/todo\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/) &&
       request.method === 'GET'){
       service.getTodoByID(request,response);
    }
    else if(request.method === 'POST' && reqURL.pathname === '/todo'){
       service.createTodo(request,response);
    }
    else if(request.method === 'PUT' && 
            request.url.match(/\/todo\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/)){
        service.updateTodoByID(request,response);
    }
    else if(request.method === 'DELETE' && 
            request.url.match(/\/todo\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/)){
        service.deleteTodoByID(request,response);
    }
    else{
        response.status = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end("Invalid Request");
    }

}).listen(process.env.PORT || 8080)