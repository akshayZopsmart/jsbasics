import Router from "koa-router";

import {
	getUsers,
	getUsersByID,
	createUser,
	removeUser,
	loginUser,
	getUsersForFeed,
} from "../controller/user";

export const userRouter = new Router();

userRouter.prefix("/users");

userRouter.post("/signup", createUser);

userRouter.post("/userlist", getUsersForFeed);

userRouter.post("/signin", loginUser);

userRouter.get("/", getUsers);

userRouter.get("/:userID", getUsersByID);

userRouter.del("/:userID", removeUser);
