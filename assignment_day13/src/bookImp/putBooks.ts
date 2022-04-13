import koa from "koa";
import { getBookID } from "./books";
import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthenticationError } from "../customErrors/AuthenticationError";

export const updateBook = (ctx: koa.Context) => {
	const id = ctx.params.id;
	try {
		const book = getBookID(id);
		if (!book) throw new NotFoundError(id);

		if (book.publisherID !== ctx.request.body.ownerID)
			throw new AuthenticationError(id, ctx.request.body.ownerID);
		if (book.publisherID === ctx.request.body.review.userID) {
			ctx.status = 200;
			ctx.body = 'LMAO dont be greedy you cant post reviews yourself';
			return
		}
			
		book.name = ctx.request.body.name || book.name;
		if (ctx.request.body.review) book.reviews.push(ctx.request.body.review);
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
