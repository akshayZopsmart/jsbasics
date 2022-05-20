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

reviewRouter.post("/reviewlist", verifyToken, getReviewForFeed);

reviewRouter.post("/:bookID", verifyToken, createReview);

reviewRouter.get("/user", verifyToken, getReviewForUser);

reviewRouter.get("/:bookID", verifyToken, getReviewForBook);

reviewRouter.del("/:reviewID", verifyToken, deleteReview);

reviewRouter.put("/:reviewID", verifyToken, updateReview);
