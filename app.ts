import Zode from "@zode/zode";
import {
	createTodo,
	getTodos,
	getTodo,
	updateTodo,
	deleteTodo,
} from "./controller/todoController";

const app = new Zode();
app.prefix("/todo");
app.post("/",createTodo)
app.get("/", getTodos);
app.get("/:id", getTodo);
app.put("/:id", updateTodo);
app.delete("/:id", deleteTodo);

app.start();
