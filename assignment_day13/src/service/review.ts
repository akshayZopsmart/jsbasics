import { review, reviewList } from "../models/review";
const db = require("../database/db");

export const createReviewService = async (reviewObject: review) => {
	return await db("reviews")
		.insert(reviewObject)
		.catch((err: any) => {
			throw new Error(err.message);
		});
};

export const getReviewForUserService = async (userID: string) => {
	return await db("reviews")
		.where({ reviewerID: userID })
		.then((review: any) => {
			return review;
		})
		.catch((error: any) => {
			throw new Error(error.message);
		});
};

export const getReviewByID = async (reviewID: string) => {
	return await db("reviews")
		.where({ reviewID })
		.then((review: any) => {
			return review[0];
		})
		.catch((error: any) => {
			throw new Error(error.message);
		});
};

export const getReviewForBookService = async (bookID: string) => {
	return await db("reviews")
		.where({ bookID })
		.then((review: any) => {
			return review;
		})
		.catch((error: any) => {
			throw new Error(error.message);
		});
};

export const updateReviewService = async (reviewID: string, review: string) => {
	return await db("reviews").where({ reviewID }).update({ review });
};

export const deleteReviewService = async (reviewID: string) => {
	return await db("reviews").where({ reviewID }).del();
};
