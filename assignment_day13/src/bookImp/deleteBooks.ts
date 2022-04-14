import koa from "koa";
import { booksList } from "./books";
import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthenticationError } from "../customErrors/AuthenticationError";

export const removeBook = (ctx: koa.Context) => {
	const bookID = ctx.params.bookID;
	try {
		const bookIndex = booksList.findIndex((book) => book.bookID === bookID);
		if (bookIndex === -1) throw new NotFoundError(bookID);
		if (booksList[bookIndex].publisherID !== ctx.request.body.userID)
			throw new AuthenticationError(
				booksList[bookIndex].bookID,
				ctx.request.body.userID
			);

		ctx.status = 200;
		ctx.body = booksList[bookIndex];
		booksList.splice(bookIndex, 1);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
