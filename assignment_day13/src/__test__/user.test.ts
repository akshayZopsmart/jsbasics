import supertest from "supertest";
import app from "../app";

const appTest = supertest(app.callback());

let token = "";
let userID = "";

describe("User test", () => {
	describe("post /users/signup", () => {
		it("sign up valid user should return 200", async () => {
			const user = {
				name: "John",
				email: "john@example.com",
				password: "password",
			};
			const response = await appTest.post("/users/signup").send(user);
			userID = response.body.userID;
			expect(response.status).toBe(200);
		});

		it("sign up user without name should return 400", async () => {
			const user = {
				email: "john@example.com",
				password: "password",
			};
			const response = await appTest.post("/users/signup").send(user);
			expect(response.status).toBe(400);
		});

		it("sign up user without email should return 400", async () => {
			const user = {
				name: "John",
				password: "password",
			};
			const response = await appTest.post("/users/signup").send(user);
			expect(response.status).toBe(400);
		});

		it("sign up user without password should return 400", async () => {
			const user = {
				name: "John",
				email: "john@example.com",
			};
			const response = await appTest.post("/users/signup").send(user);
			expect(response.status).toBe(400);
		});
	});

	describe("post /users/signin/", () => {
		it("valid details returns a token", async () => {
			const user = {
				email: "john@example.com",
				password: "password",
			};
			const response = await appTest.post("/users/signin").send(user);
			expect(response.text).not.toBeUndefined();
			token = response.text;
		});

		it("return undefined if details are not valid", async () => {
			const user = {
				email: "john@example.com",
				password: "123456",
			};
			const response = await appTest.post("/users/signin").send(user);
			expect(response.status).toBe(404);
		});
	});

	describe("get /users/", () => {
		it("Fetch Users return 200", async () => {
			const response = await appTest.get("/users/");
			expect(response.status).toBe(200);
		});
	});

	describe("get /users/:userID", () => {
		it("Fetch valid user should return 200", async () => {
			const response = await appTest.get(`/users/${userID}`);
			expect(response.status).toBe(200);
		});

		it("Fetch invalid user should return 404", async () => {
			const response = await appTest.get(`/users/1`);
			expect(response.status).toBe(404);
		});
	});

	describe("del /users/", () => {
		it("Delete user should return 200", async () => {
			const response = await appTest
				.del(`/users/`)
				.set({ "x-access-token": token });
			expect(response.status).toBe(200);
		});

		it("Delete user failing should return 400", async () => {
			const response = await appTest
				.del(`/users/`)
				.set({ "x-access-token": "1" });
			expect(response.status).toBe(400);
		});
	});
});
