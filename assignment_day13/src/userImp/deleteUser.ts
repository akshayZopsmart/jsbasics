import koa from "koa";
import { usersList, errorMessage } from "./users";
import { NotFoundError } from "../customErrors/NotFoundError";

export const removeUser = (ctx: koa.Context) => {
	const id = ctx.params.id;
	try {
		const index = usersList.findIndex((user) => user.userID === id);
		if (index === -1) throw new NotFoundError(id);
		ctx.status = 200;
		ctx.body = usersList[index];
		usersList.splice(index, 1);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
