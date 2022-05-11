import { review, reviewList } from "../models/review";

export const createReviewService = (reviewObject: review) => {
	reviewList.push(reviewObject);
};

export const getReviewForUserService = (userId: string) => {
	return reviewList.filter((review) => review.reviewerID === userId);
};

export const getReviewByID = (id: string) => {
    return reviewList.find((review) => review.reviewID === id);
}

export const getReviewIndex = (id: string) => {
    return reviewList.findIndex((review) => review.reviewID === id);
}
export const getReviewForBookService = (bookID: string) => {
	return reviewList.filter((review) => review.bookID === bookID);
};

export const updateReviewService = (reviewObject: review, review: string) => {
	reviewObject.review = review;
};

export const deleteReviewService = (index: number) => {
	reviewList.splice(index, 1);
};
