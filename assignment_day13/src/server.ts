import app from "./app";
require("dotenv").config({ path: "./config/.env" });

app.listen(process.env.PORT, () => {
	console.log(`server running @ ${process.env.PORT || 8080}`);
});
