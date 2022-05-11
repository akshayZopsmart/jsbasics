import { books } from "../../assignment_day13/src/models/book";
import { review } from "../../assignment_day13/src/models/review";

export const getUsersService = (response: any) => {
	return response.data;
};

export const buildUserIDListService = (
	bookArray: Array<books>,
	reviewMap: Map<string, Array<review>>
 ) => {
	const userIDList = bookArray.map((book: any) => book.publisherID);
	// console.log(reviewMap)
	for (const review of reviewMap.keys()) {
		// console.log(review)
		// for (const reviewObject of reviewMap.get(review)) {
		// 	userIDList.push(reviewObject.reviewerID);
		// }
	}
	return userIDList;
};
