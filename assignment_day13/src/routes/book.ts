import koa from "koa";
import Router from 'koa-router';
import {
    postBook,
    getBooks,
    getBookById, 
    getBookByUser,
    deleteBook,
    updateBook
} from "../controller/book"
import { verifyToken } from "../middleware/auth"
    
export const bookRouter = new Router();
bookRouter.prefix("/books");

bookRouter.get("/", (ctx: koa.Context) => {
	getBooks(ctx);
});

bookRouter.get("/book/:bookID", (ctx: koa.Context) => {
	getBookById(ctx);
});

bookRouter.get("/user", verifyToken, (ctx: koa.Context) => {
	getBookByUser(ctx);
});

bookRouter.post("/", verifyToken, (ctx: koa.Context) => {
	postBook(ctx);
});

bookRouter.put("/:bookID", verifyToken, (ctx: koa.Context) => {
	updateBook(ctx);
});

bookRouter.del("/:bookID", verifyToken, (ctx: koa.Context) => {
	deleteBook(ctx);
});

