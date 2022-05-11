import axios from "axios";
import { getUsersService } from "../services/user";
export const getUsers = async (userslist: Array<string>,token: string) => {
	return await axios
		.post(`http://localhost:8080/users/userlist`, {
			userslist,
			headers: {
				"x-access-token": `${token}`,
			},
		})
		.then((response) => {
			return getUsersService(response);
		})
		.catch((err) => {
			return err.message;
		});
};
