import koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import Joi from "joi";
import logger from "koa-logger";
import { STATUS } from "./Todo";
import { getTodos, getTodosById ,getTodosByTitle} from "./readTodo";
import { updateTodoByID } from "./updateTodo"
import { addTodo } from "./createTodo";
import { deleteTodo } from "./deleteTodo";

const app = new koa();
const router = new Router();

app.use(json()).use(bodyParser()).use(logger());

router.prefix("/todo");

router.get("/", (ctx: koa.Context) => {
	if (ctx.query.title) {
		getTodosByTitle(ctx,ctx.query.title.toString());
	} else {
		getTodos(ctx);
	}
});

router.get("/:id", (ctx: koa.Context) => {
	const id = ctx.params.id;
	getTodosById(ctx, id);
});

router.post("/", (ctx: koa.Context) => {
	const schema = Joi.object({
		title: Joi.string().min(3).required(),
		description: Joi.string().min(5),
		status: Joi.string().valid(
			STATUS.NOT_ACTIVE,
			STATUS.ACTIVE,
			STATUS.COMPLETED,
			STATUS.IGNORED
		),
	});
	const validation = schema.validate(ctx.request.body);
	if (validation.error) {
		ctx.status = 400;
		ctx.body = validation.error.details[0].message;
		return;
	}
	addTodo(ctx, ctx.request.body.status);
});

router.put("/:id", (ctx: koa.Context) => {
	const schema = Joi.object({
		status: Joi.string().valid(
			STATUS.NOT_ACTIVE,
			STATUS.ACTIVE,
			STATUS.COMPLETED,
			STATUS.IGNORED
		),
	});

	const validation = schema.validate(ctx.request.body);
	if (validation.error) {
		ctx.status = 400;
		ctx.body = validation.error.details[0].message;
		return;
	}
	updateTodoByID(ctx, ctx.request.body.status);
});

router.del("/:id", (ctx: koa.Context) => {
	deleteTodo(ctx);
});

app.use(router.allowedMethods()).use(router.routes()).listen(8080);
