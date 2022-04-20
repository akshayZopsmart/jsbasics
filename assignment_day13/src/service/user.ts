import { users, usersList } from "../models/user";
import jwt from "jsonwebtoken";

export const getUsersByName = (name: string) => {
	return usersList.filter((user) => user.name === name);
};

export const getUserByIDService = (id: string) => {
	return usersList.find((user) => user.userID === id);
};

export const getUserByMailService = (email: string) => {
	return usersList.find((user) => user.email == email);
};

export const createUserService = (userObject: users) => {
	usersList.push(userObject);
};

export const removeUserService = (id: string) => {
	const index = usersList.findIndex((user) => user.userID == id);
	if (index === -1) {
		return {};
	}
	const userObj = usersList[index];
	usersList.splice(index, 1);
	return userObj;
};

export const loginUserService = (userObject: any) => {
	return jwt.sign(userObject, process.env.JWT_SECRET_KEY + "");
};
