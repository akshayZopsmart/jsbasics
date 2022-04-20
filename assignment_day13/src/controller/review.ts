import koa from "koa";
import Joi from "joi";
import { v4 as uuidV4 } from "uuid";

import { reviewList } from "../models/review";
import {
	createReviewService,
	deleteReviewService,
	getReviewForBookService,
	getReviewByID,
	getReviewIndex,
	getReviewForUserService,
	updateReviewService,
} from "../service/review";

import { getBooksByIDService } from "../service/book";

import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthorizationError } from "../customErrors/AuthorizationError";

const createReview = (ctx: koa.Context) => {
	const schema = Joi.object({
		review: Joi.string().required().min(5),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	const bookID = ctx.params.bookID;
	try {
		const book = getBooksByIDService(bookID);
		if (!book) throw new NotFoundError(bookID);
		const reviewObject = {
			reviewID: uuidV4(),
			userID: book.publisherID,
			bookID,
			review: ctx.request.body.review,
		};

		createReviewService(reviewObject);
		ctx.status = 201;
		ctx.body = reviewObject;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getReviewForBook = (ctx: koa.Context) => {
	try {
		const id = ctx.params.bookID;
		const reviews = getReviewForBookService(id);
		if (!reviews) throw new NotFoundError(id);
		ctx.status = 200;
		ctx.body = reviews;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getReviewForUser = (ctx: koa.Context) => {
	try {
		const id = ctx.state.userPayload.userID;
		const reviews = getReviewForUserService(id);
		if (!reviews) throw new NotFoundError(id);
		ctx.status = 200;
		ctx.body = reviews;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const deleteReview = (ctx: koa.Context) => {
	try {
		const reviewID = ctx.params.reviewID;
		const reviewIndex = getReviewIndex(reviewID);
		if (reviewIndex === -1) throw new NotFoundError(reviewID);
		const book = getBooksByIDService(reviewList[reviewIndex].bookID);
		if (!book) throw new NotFoundError(reviewList[reviewIndex].bookID);
		if (reviewList[reviewIndex].userID !== book.publisherID)
			throw new AuthorizationError(
				`${book.publisherID} is not authorized with ${reviewID}`
			);
		ctx.status = 200;
		ctx.body = reviewList[reviewIndex];
		deleteReviewService(reviewIndex);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const updateReview = (ctx: koa.Context) => {
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
		const id = ctx.params.reviewID;
		const review = getReviewByID(id);
		if (!review) throw new NotFoundError(id);
		const book = getBooksByIDService(review.bookID);
		if (!book) throw new NotFoundError(review.bookID);
		if (review.userID !== book.publisherID)
			throw new AuthorizationError(
				`${book.publisherID} is not authorized with ${review.reviewID}`
			);
		updateReviewService(review, ctx.request.body.review);
		ctx.status = 200;
		ctx.body = review;
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
};
