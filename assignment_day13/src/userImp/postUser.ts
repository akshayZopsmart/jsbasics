import koa from "koa";
import { v4 as uuidV4 } from "uuid";
import { usersList } from "./users";

export const createUser = (ctx: koa.Context) => {
	let userObject = {
		userID: uuidV4(),
		name: ctx.request.body.name
    };
    ctx.status = 201
    ctx.body = userObject
	usersList.push(userObject);
};
