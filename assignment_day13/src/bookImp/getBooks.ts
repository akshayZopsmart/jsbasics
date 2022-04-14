import koa from "koa";
import { booksList, getBookID} from "./books";
import { getUserID } from "../userImp/users";
import { NotFoundError } from "../customErrors/NotFoundError";

export const readBooks = (ctx: koa.Context) => {
	ctx.status = 200;
	ctx.body = booksList;
};

export const readBooksByID = (ctx: koa.Context) => {
	const bookID = ctx.params.bookID;
	try {
		const book = getBookID(bookID);
		if (!book) throw new NotFoundError(bookID);
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

export const readBooksByUserID = (ctx: koa.Context) => {
	const userID = ctx.params.userID;
	try {
		const user = getUserID(userID);
		if (!user) throw new NotFoundError(userID);
		ctx.status = 200;
		ctx.body = booksList.filter((book) => book.publisherID === user.userID);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
