import koa from "koa";
import Joi from "joi";
import { v4 as uuidV4 } from "uuid";

import {
	createReviewService,
	deleteReviewService,
	getReviewForBookService,
	getReviewForUserService,
	updateReviewService,
} from "../service/review";

import { getBookByIDService } from "../service/book";

import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthorizationError } from "../customErrors/AuthorizationError";

const createReview = async (ctx: koa.Context) => {
	const schema = Joi.object({
		review: Joi.string().required().min(3),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	const bookID = ctx.params.bookID;
	try {
		const book = await getBookByIDService(bookID);
		if (book.length === 0) throw new NotFoundError(bookID);

		const userID = ctx.state.userPayload.userID;

		const reviewObject = {
			reviewID: uuidV4(),
			bookID,
			reviewerID: userID,
			review: ctx.request.body.review,
		};

		await createReviewService(reviewObject);
		ctx.status = 201;
		ctx.body = reviewObject;
	} catch (error: any) {
		ctx.status = 400;
		ctx.body = error.message;
	}
};

const getReviewForBook = async (ctx: koa.Context) => {
	try {
		const id = ctx.params.bookID;
		const reviews = await getReviewForBookService(id);
		if (reviews.length === 0) throw new NotFoundError(id);
		ctx.status = 200;
		ctx.body = reviews;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getReviewForUser = async (ctx: koa.Context) => {
	try {
		const id = ctx.state.userPayload.userID;
		const reviews = await getReviewForUserService(id);
		if (reviews.length === 0) throw new NotFoundError(id);
		ctx.status = 200;
		ctx.body = reviews;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const deleteReview = async (ctx: koa.Context) => {
	try {
		const reviewID = ctx.params.reviewID;
		const record = await deleteReviewService(reviewID);
		if (record === 0) throw new NotFoundError(reviewID);
		ctx.body = `${record} records deleted successfully`;
		ctx.status = 200;
	} catch (error: any) {
		ctx.status = 400;
		ctx.body = error.message;
	}
};

const updateReview = async (ctx: koa.Context) => {
	const schema = Joi.object({
		review: Joi.string().min(3).required(),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	try {
		const reviewID = ctx.params.reviewID;
		const record = await updateReviewService(reviewID, ctx.request.body.review);
		if (record === 0) throw new NotFoundError(reviewID);
		ctx.body = `${record} records updated successfully`;
		ctx.status = 200;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getReviewForFeed = async (ctx: koa.Context) => {
	try {
		const reviewArray: any[] = [];
		const bookIDs = ctx.request.body.bookIDlist;
		for (const bookID of bookIDs) {
			const reviews = await getReviewForBookService(bookID);
			if (reviews.length > 2) reviews.length = 2;
			reviewArray.push(
				{ [bookID]: reviews }
			)
		}
		ctx.status = 200;
		ctx.body = reviewArray;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

export {
	createReview,
	getReviewForBook,
	getReviewForUser,
	deleteReview,
	updateReview,
	getReviewForFeed,
};
