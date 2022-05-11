import supertest from "supertest";
import app from "../app";

jest.mock("axios", () => ({
	__esModule: true,
	default: {
		get: jest.fn().mockResolvedValue({
			data: [
				{
					bookID: "370871b3-7d1a-449d-81b2-013246d018f2",
					publisherID: "8d43427d-2467-4045-9d13-894c66aa8e48",
					name: "new book",
					publishedDate: new Date("2022-05-10T05:32:25.021Z"),
					updatedDate: new Date("2022-05-10T05:32:25.021Z"),
				},
			],
		}),
		post: jest.fn().mockImplementation((url: string) => {
			if (url === "http://localhost:8080/review/reviewlist") {
				return Promise.resolve({
					data: [
						{
							"370871b3-7d1a-449d-81b2-013246d018f2": [
								{
									reviewID: "dd455697-9648-48d6-b476-1534b589b826",
									bookID: "370871b3-7d1a-449d-81b2-013246d018f2",
									reviewerID: "8d43427d-2467-4045-9d13-894c66aa8e48",
									review: "good",
								},
							],
						},
					],
				});
			}
			if (url === "http://localhost:8080/users/userlist") {
				return Promise.resolve({
					data: [
						{
							userID: "8d43427d-2467-4045-9d13-894c66aa8e48",
							name: "akshay",
							email: "akshay@gmail.com",
							password: "123456789",
						},
					],
				});
			}
		}),
	},
}));

const feeds = [
	{
		user: {
			userID: "8d43427d-2467-4045-9d13-894c66aa8e48",
			name: "akshay",
			email: "akshay@gmail.com",
		},
		book: {
			bookID: "370871b3-7d1a-449d-81b2-013246d018f2",
			name: "new book",
			image: "Image Loaded",
			createdDate: "2022-05-10T05:32:25.021Z",
			updatedDate: "2022-05-10T05:32:25.021Z",
		},
		reviews: [
			{
				reviewer: {
					userID: "8d43427d-2467-4045-9d13-894c66aa8e48",
					name: "akshay",
					email: "akshay@gmail.com",
				},
				review: {
					reviewID: "dd455697-9648-48d6-b476-1534b589b826",
					review: "good",
				},
			},
		],
	},
];
describe("Testing feeds", () => {
	describe("GET /feeds", () => {
		test("should fail if token is not present", async () => {
			const response = await supertest(app.callback())
				.get("/feed/")
				.set("x-access-token", "");
			expect(response.status).toBe(400);
		});

		test("should return feed", async () => {
			let response = await supertest(app.callback())
				.get("/feed/")
				.set("x-access-token", "token");
			response = JSON.parse(response.text);
			expect(response).toEqual({ data: feeds });
		});
	});
});
