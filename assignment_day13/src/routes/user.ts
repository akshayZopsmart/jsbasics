import koa from 'koa';
import Router from 'koa-router';
import {getUsers,
    getUsersByID,
    createUser,
    removeUser,
    loginUser
} from "../controller/user"
import { verifyToken } from "../middleware/auth"
    
export const userRouter = new Router();
userRouter.prefix("/users");
userRouter.post("/signup", (ctx: koa.Context) => {
    createUser(ctx);
});

userRouter.post("/signin", (ctx: koa.Context) => {
   loginUser(ctx);
});

userRouter.get("/", (ctx: koa.Context) => {
    getUsers(ctx);
});

userRouter.get("/:userID", (ctx: koa.Context) => {
    getUsersByID(ctx);
});


userRouter.del("/:userID", verifyToken, (ctx: koa.Context) => {
    removeUser(ctx.state.userPayload)
});

