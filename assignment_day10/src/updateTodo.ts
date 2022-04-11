import koa from "koa";
import { todos, getStatus, getIndex, errorMessage } from "./Todo";

export const updateTodoByID = (ctx: koa.Context, status: string) => {
	const index = getIndex(ctx.params.id);
	if (index !== -1) {
		ctx.status = 200;
		todos[index].status = getStatus(status);
		todos[index].updatedDate = new Date();
		ctx.body = todos[index];
	} else {
		ctx.status = 404;
		ctx.body = errorMessage(ctx.params.id);
	}
};
