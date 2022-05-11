export interface users {
	userID: any;
	name: string;
	email: string;
	password: string;
}

 export const usersList: Array<users> = [];

// import mongoose from "mongoose";

// mongoose
// 	.connect("mongodb://localhost:27017/bookgranny")
// 	.then(() => {
// 		console.log("mongodb connected...");
// 	})
// 	.catch((error) => {
// 		console.log(error.message);
// 	});


// const userSchema = new mongoose.Schema({
// 	name: String,
// 	email: String,
// 	password: String
// });

// export const user = mongoose.model('user',userSchema);