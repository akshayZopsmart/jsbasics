import koa from "koa";
import Joi from "joi";
import { v4 as uuidV4 } from "uuid";
import { NotFoundError } from "../customErrors/NotFoundError";
import {
	postBooksService,
	getBooksService,
	getBookByIDService,
	getBooksByUserService,
	deleteBookService,
	updateBookService,
} from "../service/book";

const postBook = async (ctx: koa.Context) => {
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
		const token = await ctx.state.userPayload;
		let bookObject = {
			bookID: uuidV4(),
			publisherID: token.userID,
			name: ctx.request.body.name,
		};
		const book = await postBooksService(bookObject);
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};

const getBooks = async (ctx: koa.Context) => {
	try {
		const books = await getBooksService(ctx);
		ctx.body = books;
		ctx.status = 200;
	} catch (error: any) {
		ctx.body = error.message;
		ctx.status = 400;
	}
};

const getBookById = async (ctx: koa.Context) => {
	try {
		const bookID = ctx.params.bookID;
		const book = await getBookByIDService(bookID);
		ctx.status = 200;
		ctx.body = book;
	} catch (error: any) {
		ctx.status = 400;
		ctx.body = error.message;
	}
};

const getBookByUser = async (ctx: koa.Context) => {
	try {
		const books = await getBooksByUserService(ctx.params.userID);
		ctx.body = books;
		ctx.status = 200;
	} catch (error: any) {
		ctx.status = 400;
		ctx.body = error.message;
	}
};

const deleteBook = async (ctx: koa.Context) => {
	try {
		const bookID = ctx.params.bookID;
		const record = await deleteBookService(bookID);
		if (record.length === 0) throw new NotFoundError(bookID);
		ctx.status = 200;
		ctx.body = `Book with ID : ${bookID} is deleted successfully`;
	} catch (error: any) {
		ctx.status = error.status | 400;
		ctx.body = error.message;
	}
};

const updateBook = async (ctx: koa.Context) => {
	try {
		const record = await updateBookService(
			ctx.params.bookID,
			ctx.request.body.name
		);
		if (record === 0) throw new NotFoundError(ctx.params.bookID);
		ctx.body = `Book with id : ${ctx.params.bookID} updated successfully`;
		ctx.status = 200;
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
