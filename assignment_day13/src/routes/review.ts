import koa from "koa";
import Router from "koa-router";
import {
	createReview,
	deleteReview,
	updateReview,
	getReviewForBook,
	getReviewForUser,
} from "../controller/review";
import { verifyToken } from "../middleware/auth";
export const reviewRouter = new Router();
reviewRouter.prefix("/review");

reviewRouter.get("/:bookID", (ctx: koa.Context) => {
	getReviewForBook(ctx);
});

reviewRouter.get("/user", verifyToken, (ctx: koa.Context) => {
	getReviewForUser(ctx);
});

reviewRouter.post("/:bookID", (ctx: koa.Context) => {
	createReview(ctx);
});

reviewRouter.del("/:reviewID", (ctx: koa.Context) => {
	deleteReview(ctx);
});

reviewRouter.put("/:reviewID", (ctx: koa.Context) => {
	updateReview(ctx);
});
