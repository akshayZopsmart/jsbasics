import { users, usersList } from "../models/user";
import {NotFoundError} from "../customErrors/NotFoundError"
import jwt from "jsonwebtoken";

export const getUsersService = () => {
	return usersList;
};
export const getUsersByName = (name: string) => {
	return usersList.filter((user) => user.name === name);
};

export const getUserByIDService = (id: string) => {
	return usersList.find((user) => user.userID === id);
};

export const getUserByMailService = (email: string) => {
	return usersList.find((user) => user.email == email);
};

export function createUserService(userObject: users) {
	usersList.push(userObject);
}

export const removeUserService = (id: string) => {
	const index = usersList.findIndex((user) => user.userID == id);
	if (index === -1) {
		return undefined;
	}
	const userObj = usersList[index];
	usersList.splice(index, 1);
	return userObj;
};

export const loginUserService = (userObject: any, password: string) => {
	if(userObject.password === password)
		return jwt.sign(userObject, process.env.JWT_SECRET_KEY + "");
	return undefined;
};


export const getUserDetailsService = (userSet: Set<string>) => {
	const userDetails = [];
	for (const id of userSet) {
		userDetails.push(getUserByIDService(id));
	}
	return userDetails;
};
