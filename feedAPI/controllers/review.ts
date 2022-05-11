import axios from "axios";
import { getReviewsService } from "../services/review";

export const getReviews = async (bookIDlist: Array<string>, token: string) => {
	return await axios
		.post(`http://localhost:8080/review/reviewlist`, {
			bookIDlist,
			headers: {
				"x-access-token": `${token}`,
			},
		})
		.then((response) => {
			return getReviewsService(response,bookIDlist);
		})
		.catch((err) => {
			return err.message;
		});
};
