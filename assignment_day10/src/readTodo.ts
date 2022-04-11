import { todos, errorMessage, getIndex } from "./Todo";
import koa from "koa";

export const getTodos = (ctx: koa.Context) => {
	ctx.status = 200;
	ctx.body = todos;
};

export const getTodosByTitle = (ctx: koa.Context, title: string) => {
	ctx.status = 200;
	ctx.body = todos.filter((todo) => todo.title === title);
};

export const getTodosById = (ctx: koa.Context, id: string) => {
	const index = getIndex(id);
	if (index !== -1) {
		ctx.status = 200;
		ctx.body = todos[index];
	} else {
		ctx.status = 404;
		ctx.body = errorMessage(id);
	}
};
