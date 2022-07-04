import {v4 as uuidV4} from "uuid"
import koa from 'koa';
import { todos, getStatus ,STATUS } from "./Todo";

export const addTodo = (ctx: koa.Context, status: string) => {
    const todoObject = {
			id: uuidV4(),
			title: ctx.request.body.title,
			description: ctx.request.body.description,
			status: STATUS.ACTIVE,
			createdDate: new Date(),
			updatedDate: new Date(),
		};
	
	if (status) todoObject.status = getStatus(status);
    ctx.status = 200;
    ctx.body = todoObject;
    todos.push(todoObject);
    
};
