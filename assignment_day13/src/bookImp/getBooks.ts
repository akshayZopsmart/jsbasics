import koa from "koa";
import { booksList, getBookID, errorMessage } from "./books";
import { getUserID } from "../userImp/users";
import { NotFoundError } from "../customErrors/NotFoundError";

export const readBooks = (ctx: koa.Context) => {
	ctx.status = 200;
	ctx.body = booksList;
};

export const readBooksByID = (ctx: koa.Context) => {
	try {
		const book = getBookID(ctx.params.id);
		if (!book) throw new NotFoundError(ctx.params.id);
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

export const readBooksByUserID = (ctx: koa.Context) => {
	try {
		const user = getUserID(ctx.params.id);
		if (!user) throw new NotFoundError(ctx.params.id);
		ctx.status = 200;
		ctx.body = booksList.filter((book) => book.publisherID === user.userID);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
