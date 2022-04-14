import koa from "koa";
import { reviewList } from "./reviews";
import { getBookID } from "../bookImp/books";
import { NotFoundError } from "../customErrors/NotFoundError";
import { AuthenticationError } from "../customErrors/AuthenticationError";

export const removeReview = (ctx: koa.Context) => {
	const reviewID = ctx.params.reviewID;
	try {
		const reviewIndex = reviewList.findIndex((r) => r.reviewID === reviewID);
		if (reviewIndex === -1) throw new NotFoundError(reviewID);
		if (
			reviewList[reviewIndex].userID !==
			getBookID(reviewList[reviewIndex].bookID)?.publisherID
		)
			throw new AuthenticationError(
				reviewList[reviewIndex].bookID,
				reviewList[reviewIndex].userID
			);
		ctx.status = 200;
		ctx.body = reviewList[reviewIndex];
		reviewList.splice(reviewIndex, 1);
	} catch (error: any) {
		ctx.status = error.status;
		ctx.body = error.message;
	}
};
