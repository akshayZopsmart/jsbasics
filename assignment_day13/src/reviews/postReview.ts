import koa from "koa";
import { v4 as uuidV4 } from "uuid";
import { reviewList } from "./reviews";
import { getBookID } from "../bookImp/books";
import { NotFoundError } from "../customErrors/NotFoundError";

export const addReview = (ctx: koa.Context) => {
	const bookID = ctx.params.bookID;
	try {
		const book = getBookID(bookID);
		if (!book) throw new NotFoundError(bookID);
		let reviewObject = {
			reviewID: uuidV4(),
			userID: book.publisherID,
			bookID,
			message: ctx.request.body.message,
		};
		reviewList.push(reviewObject);
		ctx.status = 201;
		ctx.body = reviewObject;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
