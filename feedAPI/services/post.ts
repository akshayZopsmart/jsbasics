import lodash from "lodash";
import { IPOST } from "../models/feed";
import { buildReview } from "../services/review";

export const postService = (
	bookArray: Array<any>,
	userArray: Array<any>,
	reviewMap: Map<string, any>
) => {
	
	const postList: IPOST[] = [];
	for (const book of bookArray) {
		const user = userArray.find((u: any) => u.userID === book.publisherID);
		const review = reviewMap.get(book.bookID);
		const reviewArray: Array<any> = buildReview(review, userArray);
		postList.push({
			user: lodash.pick(user, ["userID", "name", "email"]),
			book: {
				bookID: book.bookID,
				name: book.name,
				image: "Image Loaded",
				createdDate: book.publishedDate,
				updatedDate: book.updatedDate,
			},
			reviews: reviewArray,
		});
	}
	return postList;
};
