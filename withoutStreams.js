const fs =  require('fs/promises');
const readFileWithoutStream = async (ctx) => {
    try {
		let ts = Math.floor(Date.now() / 1000);
        await fs.readFile("/home/raramuri/file.txt", { encoding: "utf8" });
        const es  = Date.now();
        console.log("seconds without streams : " , es - ts);
		ctx.body = "read";
		ctx.status = 200;
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = readFileWithoutStream;

