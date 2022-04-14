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

import { addReview } from "./reviews/postReview";
import { getReviewsByBookID, getReviewsForUserID } from "./reviews/getReview";
import { removeReview } from "./reviews/deleteReview";
import { updateReview } from "./reviews/putReview";

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

userRouter.get("/:userID", (ctx: koa.Context) => {
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

userRouter.del("/:userID", (ctx: koa.Context) => {
	removeUser(ctx);
});

const bookRouter = new Router();
bookRouter.prefix("/books");
bookRouter.get("/", (ctx: koa.Context) => {
	readBooks(ctx);
});

bookRouter.get("/:bookID", (ctx: koa.Context) => {
	readBooksByID(ctx);
});

bookRouter.get("/user/:userID", (ctx: koa.Context) => {
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

bookRouter.put("/:bookID", (ctx: koa.Context) => {
	const schema = Joi.object({
		userID: Joi.string().required(),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	updateBook(ctx);
});

bookRouter.del("/:bookID", (ctx: koa.Context) => {
	const schema = Joi.object({
		userID: Joi.string().required(),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	removeBook(ctx);
});

const reviewRouter = new Router();
reviewRouter.prefix("/review");

reviewRouter.get("/:bookID", (ctx: koa.Context) => {
	getReviewsByBookID(ctx);
});

reviewRouter.get("/user/:userID", (ctx: koa.Context) => {
	getReviewsForUserID(ctx);
});

reviewRouter.post("/:bookID", (ctx: koa.Context) => {
	const schema = Joi.object({
		message: Joi.string().required().min(5),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	addReview(ctx);
});

reviewRouter.del("/:reviewID", (ctx: koa.Context) => {
	removeReview(ctx);
});

reviewRouter.put("/:reviewID", (ctx: koa.Context) => {
	updateReview(ctx);
});

app
	.use(userRouter.routes())
	.use(userRouter.allowedMethods())
	.use(bookRouter.routes())
	.use(bookRouter.allowedMethods())
	.use(reviewRouter.routes())
	.use(reviewRouter.allowedMethods())
	.listen(8080, () => {
		console.log(`server running @8080`);
	});
