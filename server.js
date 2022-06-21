const koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const koaLogger = require("koa-logger");
const childProcess = require("child_process");
const cluster = require("cluster");
const os = require("os");
const { readFileWithoutChild } = require("./withoutChildProcess");
const app = new koa();
const router = new Router();

const cpus = os.cpus().length;

// if (cluster.isMaster) {
// 	for (let i = 0; i < cpus; ++i) cluster.fork();

//     cluster.on('online', (worker) => {
//         console.log(`worker with id : ${worker.process.pid}`)
//     })
// 	cluster.on("exit", () => {
// 		cluster.fork();
// 	});
// } else {
    router.get("/child", async (ctx) => {
        console.log(process.pid);
		const child = childProcess.fork("./withChildProcess.js");
		await new Promise((resolve) => {
			child.send("start");
			child.on("message", (time) => {
				resolve(time);
			});
		});
		
		ctx.body = "pipeline done";
		ctx.status = 200;
	});

    router.get("/nochild", async (ctx) => {
        console.log(process.pid);
		await readFileWithoutChild(ctx);
		ctx.body = "done";
		ctx.status = 200;
	});

    router.get("/withoutstreams", async (ctx) => {
        console.log(process.pid);
		const child = childProcess.fork("./withoutStreams.js");
		await new Promise((resolve) => {
			child.send(ctx);
			child.on("message", (time) => {
				resolve(time);
			});
		});
	});

    router.get("/health", (ctx) => {
        console.log(process.pid);
		ctx.body = "health check done";
		ctx.status = 200;
	});
	app.use(koaLogger());
	app.use(router.routes());
	app.use(router.allowedMethods());
	app.use(koaBody({ multipart: true }));

	app.listen(8000, () => console.log("listening"));
// }
