import koa from "koa";
import { getBookID } from "./books";
import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthenticationError } from "../customErrors/AuthenticationError";

export const updateBook = (ctx: koa.Context) => {
	const bookID = ctx.params.bookID;
	try {
		const book = getBookID(bookID);
		if (!book) throw new NotFoundError(bookID);

		if (book.publisherID !== ctx.request.body.userID)
			throw new AuthenticationError(bookID, ctx.request.body.userID);
			
		book.name = ctx.request.body.name || book.name;
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
