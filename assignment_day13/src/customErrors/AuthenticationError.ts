export class AuthenticationError extends Error {
	status: number;
	constructor(bookID: string, userID: string) {
		super(`Book ID : ${bookID} is not Authenticated with userID : ${userID}`);
		this.status = 401;
	}
}
