const todos: Array<any> = [];
enum STATUS {
	NOT_ACTIVE = "Not active",
	ACTIVE = "Active",
	COMPLETED = "Completed",
  IGNORED = "Ignored",
  UNKNOWN = "Unknown"
}
const addTodo = (todoObject: any) => {
	todos.push(todoObject);
};

const findTodoByID = (id: any) => {
	return todos.findIndex((todo) => todo.id === id);
};

const errorMessage = (id: any) => {
	return `ID : ${id} - Not Found`;
};

const findTodoByTitle = (title: any) => {
	return todos.filter((todo) => todo.title === title);
};

const updateTodoByID = (index: number, status: string) => {
	status = status.toUpperCase();
  status = getStatus(status);

  if (status!== 'Unknown')
    todos[index].status = status;
	todos[index].updatedDate = new Date();
	return todos[index];
};

const getStatus = (status: string) => {
	let resultENUM: STATUS;
	console.log(status);
	switch (status) {
		case "ACTIVE": {
			resultENUM = STATUS.ACTIVE;
			break;
		}
		case "COMPLETED": {
			resultENUM = STATUS.COMPLETED;
			break;
		}
		case "NOT_ACTIVE": {
			resultENUM = STATUS.NOT_ACTIVE;
			break;
		}
		case "IGNORED": {
			resultENUM = STATUS.IGNORED;
			break;
		}
		default:
			resultENUM = STATUS.UNKNOWN;
	}
	return resultENUM;
};

export {
	todos,
	STATUS,
	addTodo,
	findTodoByTitle,
	findTodoByID,
	errorMessage,
	updateTodoByID,
};
