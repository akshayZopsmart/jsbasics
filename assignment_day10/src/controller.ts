import { v4 as uuidV4 } from "uuid";
import koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import {
	todos,
	STATUS,
	addTodo,
	findTodoByTitle,
	findTodoByID,
	errorMessage,
	updateTodoByID,
} from "./Todo";

const app = new koa();
const router = new Router();

app.use(json());
app.use(bodyParser());

router.prefix("/todo");

router.get("/", (ctx) => {
	if (ctx.query.title) {
		ctx.status = 200;
		ctx.body = findTodoByTitle(ctx.query.title);
	} else {
		ctx.status = 200;
		ctx.body = todos;
	}
});

router.get("/:id", (ctx) => {
	const id = ctx.params.id;
	const index = findTodoByID(id);
	if (index !== -1) {
		ctx.status = 200;
		ctx.body = todos[index];
	} else {
		ctx.status = 404;
		ctx.body = errorMessage(id);
	}
});

router.post("/", (ctx) => {
	const id = uuidV4();
	const todoObject = {
		id: id,
		title: ctx.request.body.title,
		description: ctx.request.body.description,
		status: STATUS.ACTIVE,
		createdDate: new Date(),
		updatedDate: new Date(),
	};
	addTodo(todoObject);
	ctx.status = 200;
	ctx.body = todoObject;
});

router.put("/:id", (ctx) => {
	const id = ctx.params.id;
	const index = findTodoByID(id);
	if (index !== -1) {
		ctx.status = 200;
		ctx.body = updateTodoByID(index,ctx.request.body.status);
	} else {
		ctx.status = 404;
		ctx.body = errorMessage(id);
	}
});

router.del("/:id", (ctx) => {
	const id = ctx.params.id;
	const index = findTodoByID(id);
	if (index !== -1) {
		ctx.body = todos[index];
		todos.splice(index, 1);
		ctx.status = 200;
	} else {
		ctx.status = 404;
		ctx.body = errorMessage(id);
	}
});

app.use(router.allowedMethods()).use(router.routes()).listen(8080);
