import koa from "koa";
import { todos, getIndex, errorMessage } from "./Todo";

export const deleteTodo = (ctx: koa.Context) => {
	const id = ctx.params.id;
	const index = getIndex(id);
	if (index !== -1) {
		ctx.body = todos[index];
		todos.splice(index, 1);
		ctx.status = 200;
	} else {
		ctx.status = 404;
		ctx.body = errorMessage(id);
	}
};
