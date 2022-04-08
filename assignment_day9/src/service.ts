import { v4 as uuidv4 } from 'uuid';
import { Todo, STATUS } from './userTodo';
import http from 'http';
import url from 'url';
const todos: Array<Todo> = [];

const getAllTodos = (request: any, response: http.ServerResponse) => {
    const reqURL = url.parse(request.url, true);
    console.log(reqURL.query);
    if (reqURL.query.title) {
        let courses = [];
        for (let course of todos) {
            if (course.id === reqURL.query.title)
                courses.push(course);
        }
        if (courses.length > 0) {
            response.statusCode = 202;
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(courses));
        } else {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify("404 Title Not Found"));
        }
    } else {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(todos));
    }
}

const getTodoByID = (request: any, response: any) => {
    let id = request.url.split("/")[2];
    let course = todos.find((object: any) => object.id === id)

    if (course) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(course));
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify("404 ID Not Found"));
    }
}

const createTodo = (request: any, response: any) => {
    let body: string = '';
    request.on('data', (chunk: any) => {
        body += chunk.toString();
    })
    request.on('end', () => {
        let json = JSON.parse(body);
        let object = {
            id: uuidv4(),
            title: json.title,
            description: json.description,
            status: STATUS.NOT_ACTIVE,
            createdDate: new Date(),
            updatedDate: new Date()
        }
        let newTodo = new Todo(object);
        todos.push(newTodo);
        response.statusCode = 201;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(object));
    })
}

const deleteTodoByID = (request: any, response: any) => {
    let id = request.url.split("/")[2];
    let index = todos.findIndex((object: any) => object.id === id)

    if (index !== -1) {
        response.write(JSON.stringify(todos[index]));
        todos.splice(index, 1);
        response.statusCode = 202;
        response.end(`\nDelete Successful on ID : ${id}`);
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.parse(`404 Error ${id} Invalid`));
    }
}

const updateTodoByID = (request: any, response: any) => {
    let id = request.url.split("/")[2];
    let index = todos.findIndex((object: any) => object.id === id)

    if (index !== -1) {
        let body: string = '';
        request.on('data', (chunk: any) => {
            body += chunk.toString();
        })
        request.on('end', () => {
            response.statusCode = 200;
            let json = JSON.parse(body);
            todos[index].status = json.status | todos[index].status;
            todos[index].updatedDate = new Date();
            response.write(JSON.stringify(todos[index]));
            response.end(`\nupdate Successful on ID : ${id}`);
        })
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json')
        response.end("404 ID Not Found");
    }
}


export {
    getAllTodos,
    getTodoByID,
    createTodo,
    updateTodoByID,
    deleteTodoByID
}