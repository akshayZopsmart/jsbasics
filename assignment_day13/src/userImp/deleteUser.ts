import koa from "koa";
import { usersList, errorMessage } from "./users";
import { NotFoundError } from "../customErrors/NotFoundError";

export const removeUser = (ctx: koa.Context) => {
	const userID = ctx.params.userID;
	try {
		const index = usersList.findIndex((user) => user.userID === userID);
		if (index === -1) throw new NotFoundError(userID);
		ctx.status = 200;
		ctx.body = usersList[index];
		usersList.splice(index, 1);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
