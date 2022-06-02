import Zode, { Context, z, isValidSuccess } from "@zode/zode";
import {
	createTodoService,
	getTodosService,
	getTodoService,
	updateTodoService,
	deleteTodoService,
} from "../service/TodoService";

export const createTodo = async (ctx: Context) => {
	const schema = z.object({
		title: z.string().min(3),
		status: z.string().min(3),
		description: z.string().min(3),
	});

	try {
		if(schema.parse(ctx.state.body))
		return await createTodoService(ctx.database, ctx.state.body);		
		throw new Error('err');
			
	} catch (err: any) {
		return err.message;
	}
};

export const getTodos = async (ctx: Context) => {
	try {
		return await getTodosService(ctx.database);
	} catch (err: any) {
		return err;
	}
};

export const getTodo = async (ctx: Context) => {
	try {
		return await getTodoService(ctx.database, ctx.state.params?.id);
	} catch (err: any) {
		return err;
	}
};

export const updateTodo = async (ctx: Context) => {
	try {
		return await updateTodoService(
			ctx.database,
			ctx.state.params?.id,
			ctx.state.body
		);
	} catch (err: any) {
		return err;
	}
};

export const deleteTodo = async (ctx: Context) => {
	try {
		await deleteTodoService(ctx.database, ctx.state.params?.id);
		return `Deletion succesful for task_id :${ctx.state.params?.id}`;
	} catch (err: any) {
		return err;
	}
};
