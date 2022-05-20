import koa from "koa";
import jwt from "jsonwebtoken";
require('dotenv').config({ path: "../../.env" });

export const verifyToken =  async (ctx: koa.Context,next : koa.Next) => {
    try {
        const token = ctx.request.header['x-access-token']?.toString() || ctx.request.body.headers['x-access-token']
        jwt.verify(token, process.env.JWT_SECRET_KEY + "", async (err: any, data: any) => {
            if (err) {
                ctx.body = err.message;
                return
            }
            ctx.state.userPayload = data;
        });
        await next();
    } catch (error: any) {
        ctx.status = 400
        ctx.body = error.message
    }
};