import supertest from "supertest";
import app from "../app";

let token: string;
let userID: string;
let bookID: string;
const appTest = supertest(app.callback());
beforeAll(async () => {
	const userObject = {
		name: "John",
		email: "john@example.com",
		password: "password",
	};
	const user = await appTest.post("/users/signup").send(userObject);
	const response = await appTest.post("/users/signin").send({
		email: userObject.email,
		password: userObject.password,
	});
	token = response.text;
	userID = user.body.userID;
});

describe("Book tests", () => {
	describe("post /books/", () => {
		it("creates a new book and returns 200", async () => {
			const book = {
				name: "book",
			};
			const response = await appTest
				.post("/books/")
				.send(book)
				.set({ "x-access-token": token });
			bookID = response.body.bookID;
			expect(response.status).toBe(201);
		});

		it("Creates a new book with invalid token and returns 400 and jwt malformed", async () => {
			const book = {
				name: "book",
			};
			const response = await appTest
				.post("/books/")
				.send(book)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});

		it("Creates a new book with no name", async () => {
			const book = {};
			const response = await appTest
				.post("/books/")
				.send(book)
				.set({ "x-access-token": token });
			expect(response.status).toBe(400);
		});
	});

	describe("get /books/", () => {
		it("get books and return 200", async () => {
			const response = await appTest
				.get("/books/")
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});

		it("get books with invalid token and return 400 with malformed jwt", async () => {
			const response = await appTest
				.get("/books/")
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});

	describe("get /books/:bookId", () => {
		it("get book with bookID and return 200", async () => {
			const response = await appTest
				.get(`/books/${bookID}`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});

		it("get book with invalid bookID and return 404", async () => {
			const response = await appTest
				.get(`/books/1`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(404);
		});

		it("get book with invalid token and return 400 and jwt malformed", async () => {
			const response = await appTest
				.get(`/books/${bookID}`)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});

		it("get book with userID and return 200", async () => {
			const response = await appTest
				.get(`/books/user`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});
		it("get book with invalid userID/token and return 400 and jwt malformed", async () => {
			const response = await appTest
				.get(`/books/user`)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});

	describe("put /books/:bookId", () => {
		it("update book and return 200", async () => {
			const book = {
				name: "BookUpdated",
			};
			const response = await appTest
				.put(`/books/${bookID}`)
				.send(book)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});
		it("update book with invalid bookID and return 404 ", async () => {
			const book = {
				name: "BookUpdated",
			};
			const response = await appTest
				.put(`/books/1`)
				.send(book)
				.set({ "x-access-token": token });
			expect(response.status).toBe(404);
		});
		it("update book with invalid token and return 400 and jwt malformed", async () => {
			const book = {
				name: "BookUpdated",
			};
			const response = await appTest
				.put(`/books/${bookID}`)
				.send(book)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});

	describe("del /books/:bookID", () => {
		it("Delete book and return 200", async () => {
			const response = await appTest
				.del(`/books/${bookID}`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});
		it("delete book with invalid bookID and return 404", async () => {
			const response = await appTest
				.del(`/books/1`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(404);
		});
		it("delete book with invalid token and return 400 and jwt malformed", async () => {
			const response = await appTest
				.del(`/books/${bookID}`)
				.set({ "x-access-token": "token" });
			expect(response.status).toBe(400);
			expect(response.text).toEqual("jwt malformed");
		});
	});
});
