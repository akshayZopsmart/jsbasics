interface Todo {
	id: any;
	title: string;
	description: string;
	status: STATUS;
	createdDate: Date;
	updatedDate: Date;
}

enum STATUS {
	NOT_ACTIVE = "Not_active",
	ACTIVE = "Active",
	COMPLETED = "Completed",
	IGNORED = "Ignored",
}

const todos: Array<Todo> = [];

const getStatus = (status: string) => {
	status = status.toUpperCase();
	let resultENUM: STATUS;
	switch (status) {
		case "ACTIVE": {
			resultENUM = STATUS.ACTIVE;
			break;
		}
		case "COMPLETED": {
			resultENUM = STATUS.COMPLETED;
			break;
		}
		case "NOT ACTIVE": {
			resultENUM = STATUS.NOT_ACTIVE;
			break;
		}
		default:
			resultENUM = STATUS.IGNORED;
	}
	return resultENUM;
};

const getIndex = (id: string) => {
	return todos.findIndex((todo) => todo.id === id);
};

const errorMessage = (id: string) => {
	return `ID : ${id} - Not Found`;
};

export { todos, STATUS, getStatus, getIndex, errorMessage };
