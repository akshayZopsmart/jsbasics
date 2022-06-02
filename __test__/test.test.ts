import { createMockContext, Mocks } from "@zode/zode";

import { createTodo ,getTodos,getTodo,updateTodo,deleteTodo } from "../controller/todoController";

const describeDescription = "mock sql Database";

describe(describeDescription, () => {
	const mockDatabase = Mocks.sqlDatabase();
	test("create todo must pass", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					title: "title",
					status: "status",
					description: "description",
				},
			},
		});
		await createTodo(mockContext);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("create todo without title fails", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					status: "status",
					description: "description",
				},
			},
		});
        const res = await createTodo(mockContext);
        const response = JSON.parse(res);
		expect(response[0].code).toBe("invalid_type");
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("create todo without status fails", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					title: "title",
					description: "description",
				},
			},
		});
		const res = await createTodo(mockContext);
		        const response = JSON.parse(res);
		expect(response[0].code).toBe("invalid_type");
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("create todo without description fails", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					title: "title",
					status: "status",
				},
			},
		});
		const res = await createTodo(mockContext);
		        const response = JSON.parse(res);

		expect(response[0].code).toBe("invalid_type");
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("get todos", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
		});
		await getTodos(mockContext);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("get todo", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				params: { id : "12345"},
			},
		});
		await getTodo(mockContext);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("update todo should update", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					title: "title",
					status: "status"
				},
				params: { id: "12345" },
			},
		});
		await updateTodo(mockContext);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("update todo without title should fail", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					status: "status",
					description: "description",
				},
				params: { id: "12345" },
			},
		});
		const response = await updateTodo(mockContext);
		console.log(response);
		expect(response.status).toEqual(400);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("update todo without status should fail", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					title: "title",
					description: "description",
				},
				params: { id: "12345" },
			},
		});
		const response = await updateTodo(mockContext);
		expect(response.status).toEqual(400);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("update todo without description should fail", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				body: {
					title: "title",
					status: "status",
				},
				params: { id: "12345" },
			},
		});
		const response = await updateTodo(mockContext);
		expect(response.status).toEqual(400);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("delete todo should delete", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
			state: {
				params: { id: "12345" },
			},
		});
		await deleteTodo(mockContext);
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});

	test("delete todo without params should fail", async () => {
		const mockContext = createMockContext({
			database: mockDatabase,
		});
		const response = await deleteTodo(mockContext);
		const splitted = response.split(":");
		expect(splitted[1]).toBe("undefined");
		expect(mockDatabase.rawQuery).toHaveBeenCalled();
	});
});
