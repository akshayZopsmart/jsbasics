import axios from "axios";
import { getBooksService } from "../services/book";

export const getBooks = async (token: string) => {
	return await axios
		.get("http://localhost:8080/books/", {
			headers: {
				"x-access-token": `${token}`,
			},
		})
		.then(async (response) => {
			return getBooksService(response.data);
		})
		.catch((err) => {
			return err.message;
		});
};
