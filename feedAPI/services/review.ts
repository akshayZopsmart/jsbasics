import lodash from "lodash";

export const getReviewsService = (response: any,bookIDlist : Array<string>) => {
	const reviewObject = response.data;
	const revMap: Map<string, any> = new Map();

	for (const id in reviewObject) {
		if (reviewObject.hasOwnProperty(id)) {
			for (const bookID in reviewObject[id]) {
				revMap.set(bookID, reviewObject[id][bookID])
			}
		}
	}
	return revMap;
};

export const buildReview = (review : any, userArray : any) => {
	const reviewArray: Array<any> = [];
	for (const rev of review) {
		const user = userArray.find((u: any) => u.userID === rev.reviewerID);
		const reviewObj = {
			reviewer: lodash.pick(user, ["userID", "name", "email"]),
			review: lodash.pick(rev, ["reviewID", "review"]),
		};
		reviewArray.push(reviewObj);
	}
	return reviewArray;
};
