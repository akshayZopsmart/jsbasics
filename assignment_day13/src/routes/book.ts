import koa from "koa";
import Router from "koa-router";
import {
	postBook,
	getBooks,
	getBookById,
	getBookByUser,
	deleteBook,
	updateBook,
} from "../controller/book";
import { verifyToken } from "../middleware/auth";

export const bookRouter = new Router();
bookRouter.prefix("/books");

bookRouter.post("/", verifyToken, (ctx: koa.Context) => {
    postBook(ctx);
});

bookRouter.get("/", verifyToken, (ctx: koa.Context) => {
	getBooks(ctx);
});

bookRouter.get("/user", verifyToken, (ctx: koa.Context) => {
    getBookByUser(ctx);
});

bookRouter.get("/:bookID", verifyToken, (ctx: koa.Context) => {
	getBookById(ctx);
});

bookRouter.put("/:bookID", verifyToken, (ctx: koa.Context) => {
	updateBook(ctx);
});

bookRouter.del("/:bookID", verifyToken, (ctx: koa.Context) => {
	deleteBook(ctx);
});
