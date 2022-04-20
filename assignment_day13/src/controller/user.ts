import koa from "koa";
import Joi from "joi";
import { v4 as uuidV4 } from "uuid";

import { usersList } from "../models/user";
import {
	getUsersByName,
	getUserByIDService,
	getUserByMailService,
	createUserService,
	removeUserService,
	loginUserService,
} from "../service/user";

import { NotFoundError } from "../customErrors/NotFoundError";

const getUsers = (ctx : koa.Context) => {
    ctx.status = 200
    const name = ctx.query.name || ""
    if (name) {
        ctx.body = getUsersByName(name.toString());
    return}
	ctx.body = usersList;
};

const getUsersByID = (ctx: koa.Context) => {
    try {
        const user = getUserByIDService(ctx.params.userID);
        if (!user) throw new NotFoundError(ctx.params.userID);
        ctx.body = user;
        ctx.status = 200
    } catch (error: any) {
        ctx.status = error.status;
        ctx.body = error.message;
    }
};

const getUsersByEmail = (id: string) => {
	return getUserByMailService(id);
};

const createUser = (ctx: koa.Context) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		email: Joi.string().min(4).required(),
		password: Joi.string().min(8).required(),
	});

	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}

	let userObject = {
		userID: uuidV4(),
		name: ctx.request.body.name,
		email: ctx.request.body.email,
		password: ctx.request.body.password,
	};

	createUserService(userObject);
	ctx.status = 200;
	ctx.body = userObject;
};

const removeUser = (ctx: koa.Context) => {
	try {
		const user = removeUserService(ctx.params.userID);
		if (!user) throw new NotFoundError(ctx.params.userID);
		ctx.status = 200;
		ctx.body = user;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const loginUser = (ctx: koa.Context) => {
	const schema = Joi.object({
		email: Joi.string().min(4).required(),
		password: Joi.string().required(),
	});

	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}

	const object = {
		email: ctx.request.body.email,
		password: ctx.request.body.password,
	};
	try {
		let userObject = getUserByMailService(object.email);
		if (!userObject) throw new NotFoundError(object.email);
		ctx.body = loginUserService(userObject);
		ctx.status = 202;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

export {
	getUsers,
	getUsersByID,
	getUsersByEmail,
	createUser,
	removeUser,
	loginUser,
};
