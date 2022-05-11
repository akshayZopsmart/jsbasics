import koa from "koa";
import { getUsers } from "./user";
import { getBooks } from "./book";
import { getReviews } from "./review";
import { books } from "../../assignment_day13/src/models/book";
import { review } from "../../assignment_day13/src/models/review";
import { users } from "../../assignment_day13/src/models/user";

import { IPOST } from "../models/feed";

import { buildUserIDListService } from "../services/user";
import { postService } from "../services/post";

export const getFeeds = async (ctx: any) => {
	try {
		const token = ctx.request.headers["x-access-token"];
		if (!token) {
			throw new Error("token not present");
		}
		const bookArray: Array<books> = await getBooks(token);
		console.log("1 ", bookArray);
		const bookIDList: Array<string> = bookArray.map(
			(book: books) => book.bookID
		);
		console.log("2 ", bookIDList);

		const reviewMap: any = await getReviews(bookIDList, token);
		console.log("3", reviewMap);
		const userIDList: Array<string> = buildUserIDListService(
			bookArray,
			reviewMap
		);
		console.log("4", userIDList);
		const userArray: Array<users> = await getUsers(userIDList, token);

		console.log("5", userArray);
		const postList: Array<IPOST> = postService(bookArray, userArray, reviewMap);

		ctx.body = { data: postList || [] };
		ctx.status = 200;
	} catch (error: any) {
		ctx.status = 400;
		ctx.body = error.message;
	}
};
