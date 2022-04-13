export interface users {
	userID: any;
	name: string;
}

const usersList: Array<users> = [];

const getUserID = (id: string) => {
	return usersList.find((user) => user.userID === id);
};
const getUserName = (name: string) => {
	return usersList.filter((user) => user.name === name);
};

const errorMessage = (id: string) => {
	return { id: `ID : ${id} is not found` };
};

export { usersList, getUserID, getUserName, errorMessage };
