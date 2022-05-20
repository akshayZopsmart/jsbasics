import { users, usersList } from "../models/user";
const db = require("../database/db");
import jwt from "jsonwebtoken";

export const getUsersService = async () => {
	return await db.select().table('users');
};
export const getUsersByName = async (name: string) => {
	return await db("users")
		.where({ name: name })
		.then((users: any) => {
			return users;
		})
		.catch((err: any) => {
			throw new Error(err.message);
		});
};

export const getUserByIDService = async (id: string) => {
	console.log(id)
	return await db("users").where({ userID: id })
		.then((user: any) => {
			return user
		}).catch((error: any) => {
			throw new Error(error.message)
		})
};

export const getUserByMailService = async (email: string) => {
	return await db("users")
		.where({ email: email })
		.then((data: any) => {
			return data;
		})
		.catch((err: any) => {
			throw new Error(err.message);
		});
};

export async function createUserService(userObject: users) {
	return await db("users")
		.insert(userObject)
		.then(() => {
			return userObject;
		})
		.catch((err: any) => {
			throw new Error(err.message);
		});
}

export const removeUserService = async (id: string) => {
	return await db("users").where({ userID: id }).del();
};

export const loginUserService = (userObject: any, password: string) => {
	if (userObject.password === password) {
		return jwt.sign(userObject, process.env.JWT_SECRET_KEY + "");
	}
	return undefined;
};

export const getUserDetailsService = async (userSet: Set<string>) => {
	const userDetails = [];
	for (const id of userSet) {
		const user = await getUserByIDService(id);
		userDetails.push(user[0]);
	}
	return userDetails;
};
