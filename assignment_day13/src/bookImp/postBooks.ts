import koa from "koa";
import { v4 as uuidV4 } from "uuid";
import { getUserID } from "../userImp/users";
import { booksList } from "./books";
import { NotFoundError } from "../customErrors/NotFoundError";

export const addBook = (ctx: koa.Context) => {
	const id = ctx.request.body.publisherID;
	try {
		const user = getUserID(id);
		if (!user) throw new NotFoundError(id);
		let bookObject = {
			bookID: uuidV4(),
			publisherID: user.userID,
			name: ctx.request.body.name,
			publishedDate: new Date(),
		};
		booksList.push(bookObject);
		ctx.status = 201;
		ctx.body = bookObject;
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
