import http from "http";
import url from "url";
require("dotenv").config();
import {
  getAllTodos,
  getTodoByID,
  createTodo,
  updateTodoByID,
  deleteTodoByID,
} from "./service.js";

http
  .createServer(function (request: any, response: any) {
    const reqURL = url.parse(request.url, true);
    if (request.method === "GET" && reqURL.pathname === "/todos" || reqURL.pathname === "/todos/+") {
      getAllTodos(request, response);
    } else if (
      request.url.match(
        /\/todo\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
      ) &&
      request.method === "GET"
    ) {
      getTodoByID(request, response);
    } else if (request.method === "POST" && reqURL.pathname === "/todo") {
      createTodo(request, response);
    } else if (
      request.method === "PUT" &&
      request.url.match(
        /\/todo\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
      )
    ) {
      updateTodoByID(request, response);
    } else if (
      request.method === "DELETE" &&
      request.url.match(
        /\/todo\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
      )
    ) {
      deleteTodoByID(request, response);
    } else {
      response.status = 404;
      response.setHeader("Content-Type", "application/json");
      response.end("Invalid Request");
    }
  })
  .listen(process.env.PORT || 8080);
