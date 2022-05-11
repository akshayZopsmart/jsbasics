import supertest from "supertest";
import app from "../app";

let token: string;
let userID: string;
let bookID: string;
let reviewID: string;
const appTest = supertest(app.callback());
beforeAll(async () => {
	const userObject = {
		name: "John",
		email: "john@example.com",
		password: "password",
	};

	const user = await appTest.post("/users/signup").send(userObject);
	const userResponse = await appTest.post("/users/signin").send({
		email: userObject.email,
		password: userObject.password,
	});
	token = userResponse.text;
	userID = user.body.userID;

	const bookObject = {
		name: "book",
	};
	const book = await appTest
		.post("/books/")
		.send(bookObject)
		.set({ "x-access-token": token });
	bookID = book.body.bookID;
});

describe("Review Testing", () => {
	describe("post /review/:bookID", () => {
		it("Create review and return 201", async () => {
			const review = {
				review: "good",
			};
			const response = await appTest
				.post(`/review/${bookID}`)
				.send(review)
				.set({ "x-access-token": token });
			reviewID = response.body.reviewID;
			expect(response.status).toBe(201);
		});

		it("Create review with invalid bookID and return 404", async () => {
			const review = {
				review: "good",
			};
			const response = await appTest
				.post(`/review/1`)
				.send(review)
				.set({ "x-access-token": token });
			expect(response.status).toBe(404);
		});

		it("Create review with invalid token and return 400 and jwt malformed", async () => {
			const review = {
				review: "good",
			};
			const response = await appTest
				.post(`/review/${bookID}`)
				.send(review)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});

	describe("get /review/:bookID", () => {
		it("get review for a book should return 200", async () => {
			const response = await appTest
				.get(`/review/${bookID}`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});

		it("get review for a invalid book should return 404", async () => {
			const response = await appTest
				.get(`/review/1`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(404);
		});

		it("get review for a book with invalid token should return 400 and jwt malformed", async () => {
			const response = await appTest
				.get(`/review/${bookID}`)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});

	describe("get /review/user", () => {
		it("get review by a user should return 200", async () => {
			const response = await appTest
				.get(`/review/user/`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});

		it("get review by a user with invalid token should return 400 and jwt malformed", async () => {
			const response = await appTest
				.get(`/review/user`)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});

	describe("put /review/:reviewID", () => {
		it("update review should return 200", async () => {
			const review = {
				review: "updated",
			};
			const response = await appTest
				.put(`/review/${reviewID}`)
				.send(review)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});

		it("update invalid review should return 404", async () => {
			const review = {
				review: "updated",
			};
			const response = await appTest
				.put(`/review/1`)
				.send(review)
				.set({ "x-access-token": token });
			expect(response.status).toBe(404);
		});

		it("update review for a book with invalid token should return 400 and jwt malformed", async () => {
			const review = {
				review: "updated",
			};
			const response = await appTest
				.put(`/review/${reviewID}`)
				.send(review)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});

		it("update review without mandatory fields should return 400", async () => {
			const response = await appTest
				.put(`/review/${reviewID}`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(400);
		});
	});

	describe("del /review/:reviewID", () => {
		it("delete review should return 200", async () => {
			const response = await appTest
				.del(`/review/${reviewID}`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});

		it("delete invalid review should return 404", async () => {
			const response = await appTest
				.del(`/review/1`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(404);
		});

		it("delete review for a book with invalid token should return 400 and jwt malformed", async () => {
			const response = await appTest
				.del(`/review/${reviewID}`)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});
});
