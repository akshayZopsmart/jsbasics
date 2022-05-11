import koa from "koa";
import Joi from "joi";
import { v4 as uuidV4 } from "uuid";

import {
	getUsersService,
	getUsersByName,
	getUserByIDService,
	getUserByMailService,
	createUserService,
	removeUserService,
	loginUserService,
	getUserDetailsService,
} from "../service/user";

import { NotFoundError } from "../customErrors/NotFoundError";

const getUsers = (ctx: koa.Context) => {
	ctx.status = 200;
	const name = ctx.query.name || "";
	if (name) {
		ctx.body = getUsersByName(name.toString());
		return;
	}
	ctx.body = getUsersService();
};

const getUsersByID = (ctx: koa.Context) => {
	try {
		const user = getUserByIDService(ctx.params.userID);
		if (!user) throw new NotFoundError(ctx.params.userID);
		ctx.body = user;
		ctx.status = 200;
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
	ctx.body = userObject;
	ctx.status = 200;
};

const removeUser = (ctx: koa.Context) => {
	try {
		const userID = ctx.state.userPayload.userID;
		const user = removeUserService(userID);
		if (!user) throw new NotFoundError(userID);
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
		const jwt = loginUserService(userObject, object.password);
		if (jwt === undefined)
			throw new NotFoundError(`User with email : ${object.email} is not found`);
		ctx.body = jwt;
		ctx.status = 202;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getUsersForFeed = async (ctx: koa.Context) => {
	try {
		const usersList = ctx.request.body.userslist;
		const userSet: Set<string> = new Set();
		for (const userID of usersList) {
			userSet.add(userID);
		}
		const userDetails = getUserDetailsService(userSet);
		ctx.status = 200;
		ctx.body = userDetails;
		return userDetails;
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
	getUsersForFeed,
};
