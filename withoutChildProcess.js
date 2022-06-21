const fs = require("fs");
const zlib = require("zlib");
const stream = require("stream");
const util = require("util");

const readFileWithoutChild = async () => {
	try {
		const start = new Date().getTime();
		let readStream = fs.createReadStream("/home/raramuri/file.txt", {
			encoding: "utf8",
		});
		let writeStream = fs.createWriteStream("/home/raramuri/writeFile.txt");
		for await (const chunk of readStream) {
			writeStream.write(chunk.toString().replace(/\s/g, ""));
		}
		const pipelineAsync = util.promisify(stream.pipeline);
		try {
			await pipelineAsync(
				fs.createReadStream("/home/raramuri/writeFile.txt"),
				zlib.createGzip(),
				fs.createWriteStream("/home/raramuri/writeFile.gz")
			);
			const end = new Date().getTime();
			return end - start;
		} catch (error) {
			console.log(error);
			throw error;
		}
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = { readFileWithoutChild };
