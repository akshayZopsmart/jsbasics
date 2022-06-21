function res() {
	console.log("hi");
	return "works";
}

process.on("message", async () => {
	console.log("here");
	const temp = res();
	process.exit?.(temp);
});
