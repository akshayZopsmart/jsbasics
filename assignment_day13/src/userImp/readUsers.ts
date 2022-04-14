import koa from "koa";
import { users, usersList, getUserID, getUserName } from "./users";
import { NotFoundError } from "../customErrors/NotFoundError";

const getUsers = (ctx: koa.Context) => {
	ctx.status = 200;
	ctx.body = usersList;
};

const getUserByID = (ctx: koa.Context) => {
	const userID = ctx.params.userID;
	try {
		const user = getUserID(userID);
		if (!user) throw new NotFoundError(userID);
		console.log(ctx.params, user);
		ctx.status = 200;
		ctx.body = user;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getUsersByName = (ctx: koa.Context, name: string) => {
	try {
		const users = getUserName(name);
		if (!users) throw new NotFoundError(name);
		ctx.status = 200;
		ctx.body = users;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};


export { getUsers, getUserByID, getUsersByName};
