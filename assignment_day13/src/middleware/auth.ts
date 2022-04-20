import koa from "koa";
import jwt from "jsonwebtoken";
require('dotenv').config({ path: "../../.env" });

export const verifyToken = (ctx: koa.Context,next : any) => {
    try {
        const token = ctx.request.body.token || ctx.request.header['x-access-token']
        jwt.verify(token, process.env.JWT_SECRET_KEY + "", (err: any, data: any) => {
            if (err) {
                throw new Error(err.message)
            }
            ctx.state.userPayload = data;
            next();
        });
    } catch (error: any) {
        ctx.throw(error.status,error.message)
    }
};