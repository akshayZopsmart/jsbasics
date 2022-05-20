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

bookRouter.post("/", verifyToken, postBook);

bookRouter.get("/", verifyToken, getBooks);

bookRouter.get("/user/:userID", verifyToken, getBookByUser);

bookRouter.get("/:bookID", verifyToken, getBookById);

bookRouter.put("/:bookID", verifyToken, updateBook);

bookRouter.del("/:bookID", verifyToken, deleteBook);
