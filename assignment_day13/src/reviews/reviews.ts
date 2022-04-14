interface review{
    reviewID : string
    bookID: string
    userID: string
    message: string
}

export const reviewList: Array<review> = []

export const getReviewID =  (id: string) => {
    return reviewList.find((review) => review.reviewID === id)
}

export const getReviewForUser = (id: string) => {
    return reviewList.filter((review) => review.userID === id)
}
export const getReviewsForBook = (id: string) => {
	return reviewList.filter((review) => review.bookID === id);
};
