import koa from "koa";
import Joi from "joi";
import { v4 as uuidV4 } from "uuid";

import { booksList } from "../models/book";
import {
	postBooksService,
	getBooksService,
	getBooksByIDService,
	getBooksIDService,
	getBooksByUserService,
	deleteBookService,
	updateBookService,
} from "../service/book";

import { getUserByIDService } from "../service/user";

import { NotFoundError } from "../customErrors/NotFoundError";
import { TokenError } from "../customErrors/TokenError";
import { AuthorizationError } from "../customErrors/AuthorizationError";

const postBook = (ctx: koa.Context) => {
	const schema = Joi.object({
		name: Joi.string().required().min(3),
	});
	const validationResult = schema.validate(ctx.request.body);
	if (validationResult.error) {
		ctx.status = 400;
		ctx.body = validationResult.error.details[0].message;
		return;
	}
	try {
		const token = ctx.state.userPayload;
		if (!token) throw new TokenError();
		const user = getUserByIDService(token.userID);
		if (!user) throw new NotFoundError(token.userID);
		let bookObject = {
			bookID: uuidV4(),
			publisherID: token.userID,
			name: ctx.request.body.name,
			publishedDate: new Date(),
			updatedDate: new Date(),
		};
		postBooksService(bookObject);
		ctx.status = 201;
		ctx.body = bookObject;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getBooks = (ctx: koa.Context) => {
	return new Promise((resolve, reject) => {
		ctx.body = getBooksService();
		ctx.status = 200;
		resolve(1);
	});
};

const getBookById = (ctx: koa.Context) => {
	try {
		const bookID = ctx.params.bookID;

		const book = getBooksByIDService(bookID);
		if (!book) throw new NotFoundError(bookID);
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getBookByUser = (ctx: koa.Context) => {
	try {
		const token = ctx.state.userPayload;
		if (!token) throw new TokenError();
		const user = getUserByIDService(token.userID);
		if (!user) throw new NotFoundError(token.userID);
		ctx.status = 200;
		ctx.body = getBooksByUserService(token.userID);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const deleteBook = (ctx: koa.Context) => {
	try {
		const token = ctx.state.userPayload;
		if (!token) throw new TokenError();

		const bookID = ctx.params.bookID;
		const bookIndex = getBooksIDService(bookID);
		if (bookIndex === -1) throw new NotFoundError(bookID);
		if (booksList[bookIndex].publisherID !== token.userID)
			throw new AuthorizationError(
				`${token.userID} is not authorized with ${booksList[bookIndex].bookID}`
			);

		ctx.status = 200;
		ctx.body = booksList[bookIndex];
		deleteBookService(bookIndex);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const updateBook = (ctx: koa.Context) => {
	try {
		const token = ctx.state.userPayload;
		if (!token) throw new TokenError();
		const book = getBooksByIDService(ctx.params.bookID);
		if (!book) throw new NotFoundError(token.userID);
		if (book.publisherID !== token.userID)
			throw new AuthorizationError(`${token.userID} is not authorized with ${book.bookID}`);
		updateBookService(book, ctx.request.body.name);
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};


export {
	postBook,
	getBooks,
	getBookById,
	getBookByUser,
	deleteBook,
	updateBook,
};
