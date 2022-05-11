import koa from "koa";
import Router from "koa-router";
import {
	createReview,
	deleteReview,
	updateReview,
	getReviewForBook,
	getReviewForUser,
	getReviewForFeed,
} from "../controller/review";

import { verifyToken } from "../middleware/auth";
export const reviewRouter = new Router();
reviewRouter.prefix("/review");

reviewRouter.post("/reviewlist", verifyToken, (ctx: koa.Context) => {
	return getReviewForFeed(ctx);
});

reviewRouter.post("/:bookID", verifyToken, (ctx: koa.Context) => {
	createReview(ctx);
});

reviewRouter.get("/user", verifyToken, (ctx: koa.Context) => {
	getReviewForUser(ctx);
});

reviewRouter.get("/:bookID", verifyToken, (ctx: koa.Context) => {
	getReviewForBook(ctx);
});

reviewRouter.del("/:reviewID", verifyToken, (ctx: koa.Context) => {
	deleteReview(ctx);
});

reviewRouter.put("/:reviewID", verifyToken, (ctx: koa.Context) => {
	updateReview(ctx);
});
