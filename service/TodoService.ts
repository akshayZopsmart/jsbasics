import { ZodeError, HTTPStatus} from "@zode/zode";
import { v4 as uuidV4 } from "uuid";

export const createTodoService = async (database: any, body: any) => {
	try {
		await database?.rawQuery(
			"CREATE TABLE IF NOT EXISTS TodoList (task_id varchar primary key,title VARCHAR NOT NULL,status VARCHAR,description TEXT,created_at varchar NOT NULL)"
		);
		const { title, status, description } = body;
		const res = await database?.rawQuery(
			`INSERT INTO TodoList(task_id,title, status,description, created_at )\
                VALUES ('${uuidV4()}','${title}', '${status}','${description}','${new Date().toISOString()}')RETURNING task_id;`
		);
		return res.rows[0].task_id;
	} catch (err: any) {
		throw new ZodeError("400", HTTPStatus.BAD_REQUEST, err);
	}
};

export const getTodosService = async (database: any) => {
	try {
		const res = await database?.rawQuery("SELECT * FROM TodoList");
		return res.rows;
	} catch (err: any) {
		throw new ZodeError("400", HTTPStatus.BAD_REQUEST, err.message);
	}
};

export const getTodoService = async (database: any, id: string) => {
	try {
		const res = await database?.rawQuery(
			`SELECT * FROM TodoList WHERE task_id = '${id}'`
		);
		return res.rows;
	} catch (err: any) {
		throw new ZodeError("400", HTTPStatus.BAD_REQUEST, err.message);
	}
};

export const updateTodoService = async (
	database: any,
	id: string,
	body: any
) => {
	try {
		const record = await database?.rawQuery(
			`SELECT * FROM TodoList WHERE task_id = '${id}'`
		);
		const title = body.title || record.rows[0].title;
		const description = body.description || record.rows[0].description;
		const status = body.status || record.rows[0].status;
		await database?.rawQuery(
			`update TodoList set title = '${title}',status = '${status}',description =  '${description}' where task_id = '${id}'`
		);
		const res = await database?.rawQuery(
			`SELECT * FROM TodoList WHERE task_id = '${id}'`
		);
		return res?.rows;
	} catch (err: any) {
		throw new ZodeError("400", HTTPStatus.BAD_REQUEST, err.message);
	}
};

export const deleteTodoService = async (database: any, id: string) => {
	try {
		await database?.rawQuery(`DELETE FROM TodoList WHERE task_id = '${id}'`);
	} catch (err: any) {
		throw new ZodeError("400", HTTPStatus.BAD_REQUEST, err.message);
	}
};
