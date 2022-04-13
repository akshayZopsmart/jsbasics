import koa from "koa";
import { booksList } from "./books";
import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthenticationError } from "../customErrors/AuthenticationError";

export const removeBook = (ctx: koa.Context) => {
	try {
		const bookIndex = booksList.findIndex(
			(book) => book.bookID === ctx.params.id
		);
		if (bookIndex === -1) throw new NotFoundError(ctx.params.id);
		if (booksList[bookIndex].publisherID !== ctx.request.body.ownerID)
			throw new AuthenticationError(
				booksList[bookIndex].bookID,
				ctx.request.body.ownerID``
			);

		ctx.status = 200;
		ctx.body = booksList[bookIndex];
		booksList.splice(bookIndex, 1);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
