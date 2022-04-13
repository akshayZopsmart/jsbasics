import koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import json from "koa-json";
import Joi from "joi";
import { getUsers, getUserByID, getUsersByName } from "./userImp/readUsers";
import { createUser } from "./userImp/postUser";
import { removeUser } from "./userImp/deleteUser";
import {
	readBooks,
	readBooksByID,
	readBooksByUserID,
} from "./bookImp/getBooks";
import { addBook } from "./bookImp/postBooks";
import { removeBook } from "./bookImp/deleteBooks";
import { updateBook } from "./bookImp/putBooks";

const app = new koa();
app.use(json()).use(bodyParser()).use(logger());

const userRouter = new Router();
userRouter.prefix("/users");
userRouter.get("/", (ctx: koa.Context) => {
	const name = ctx.query.name;
	if (name) {
		getUsersByName(ctx, name.toString());
	} else {
		getUsers(ctx);
	}
});

userRouter.get("/:id", (ctx: koa.Context) => {
	getUserByID(ctx);
});

userRouter.post("/", (ctx: koa.Context) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	createUser(ctx);
});


userRouter.del("/:id", (ctx: koa.Context) => {
	removeUser(ctx);
});

const bookRouter = new Router();
bookRouter.prefix("/books");
bookRouter.get("/", (ctx: koa.Context) => {
	readBooks(ctx);
});

bookRouter.get("/:id", (ctx: koa.Context) => {
	readBooksByID(ctx);
});

bookRouter.get("/user/:id", (ctx: koa.Context) => {
	readBooksByUserID(ctx);
});

bookRouter.post("/", (ctx: koa.Context) => {
	const schema = Joi.object({
		publisherID: Joi.string().required(),
		name: Joi.string().required().min(3),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	addBook(ctx);
});

bookRouter.put("/:id", (ctx: koa.Context) => {
	const schema = Joi.object({
		ownerID: Joi.string().required(),
		review: Joi.object().required(),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	updateBook(ctx);
});

bookRouter.del("/:id", (ctx: koa.Context) => {
	const schema = Joi.object({
		ownerID: Joi.string().required(),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	removeBook(ctx);
});

app
	.use(userRouter.routes())
	.use(userRouter.allowedMethods())
	.use(bookRouter.routes())
	.use(bookRouter.allowedMethods())
	.listen(8080, () => {
		console.log(`server running @8080`);
	});
