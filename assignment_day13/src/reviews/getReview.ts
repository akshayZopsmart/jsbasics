import koa from "koa"
import { getReviewsForBook ,getReviewForUser} from "./reviews"
import { NotFoundError } from "../customErrors/NotFoundError"


export const getReviewsForUserID = (ctx: koa.Context) => {
    const id = ctx.params.userID
    try {
        const reviews = getReviewForUser(id);
        if (!reviews)
            throw new NotFoundError(id)
        ctx.status = 200
        ctx.body = reviews
    } catch (error: any) {
        ctx.status = error.status
        ctx.body = error.message
    }
}

export const getReviewsByBookID = (ctx: koa.Context) => {
    const id = ctx.params.bookID;
    try {
        const reviews = getReviewsForBook(id)
        if (!reviews) 
            throw new NotFoundError(id)
        ctx.status = 200
        ctx.body = reviews
    } catch (error : any) {
        ctx.status = error.status
        ctx.body = error.message
    }
}
