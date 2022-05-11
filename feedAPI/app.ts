import koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import { getFeeds } from "./controllers/feed";

const app = new koa();
const feedRouter = new Router();
// app.use(bodyparser());

feedRouter.prefix("/feed");
feedRouter.get("/", getFeeds);

app.use(feedRouter.routes()).use(feedRouter.allowedMethods());

export default app;
