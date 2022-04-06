const uuid : any = require("uuid");
const todo = require('./userTodo');
const todos: Array<Todo> = [];

module.exports.getAllTodos = (request : any, response : any) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(todos));
}

module.exports.getTodoByID = (request : any, response : any) => {
    let id = request.url.split("/")[2];
    let index = todos.findIndex((object : any) => object.id === id)

    if(index !== -1) {  
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(todos[index]));
    }else{
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json')
        response.end("404 ID Not Found");
    }
}

module.exports.createTodo = (request : any, response : any) => {
    let body : string = '';
    request.on('data', (chunk : any) => {
        body += chunk.toString();
    })
    request.on('end', () => {
        let json = JSON.parse(body);
        let object = {
            title : json.title,
            description : json.description,
            status : todo.STATUS.NOT_ACTIVE
        }
        let id = uuid.v1();
        let newTodo = new todo.Todo(id,object.title,object.description,object.status);
        todos.push(newTodo);
        response.statusCode = 201;
        response.setHeader('Content-Type', 'application/json');
        response.end(`ID : ${id}`);
    })
}

module.exports.deleteTodoByID = (request : any, response : any) => {
    let id = request.url.split("/")[2];
    let index = todos.findIndex((object : any) => object.id === id)

    if(index !== -1) {  
        response.write(JSON.stringify(todos[index]));
        todos.splice(index, 1);
        response.statusCode = 202;
        response.end(`\nDelete Successful on ID : ${id}`);
    }else{
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json')
        response.end("404 ID Not Found");
    }
}

module.exports.updateTodoByID = (request : any, response : any) => {
    let id = request.url.split("/")[2];
    let index = todos.findIndex((object : any) => object.id === id)

    if(index !== -1) {  
        let body :string = '';
        request.on('data', (chunk : any) => {
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
    }else{
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json')
        response.end("404 ID Not Found");
    }
}