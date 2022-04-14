import koa from "koa";
import { getBookID } from "../bookImp/books";
import { getReviewID } from "./reviews";
import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthenticationError } from "../customErrors/AuthenticationError";

export const updateReview = (ctx: koa.Context) => {
	const id = ctx.params.reviewID;
	try {
		const review = getReviewID(id);
		if (!review) throw new NotFoundError(id);
		const book = getBookID(review.bookID);
		if (!book) throw new NotFoundError(review.bookID);
		if (review.userID !== book.publisherID)
			throw new AuthenticationError(book.bookID, book.publisherID);
		review.message = ctx.request.body.message;
		ctx.status = 200;
		ctx.body = review;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
