import koa from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
// import logger from "koa-logger";
import { router } from "./server/src/controller"

export const app = new koa();
app.use(json()).use(bodyParser())


app.use(router.allowedMethods()).use(router.routes()).listen(9090,() => console.log('listening on port 8080'));

