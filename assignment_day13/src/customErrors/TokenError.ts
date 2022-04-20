export class TokenError extends Error {
	status;
	constructor() {
		super("Token Invalid");
		this.status = 404;
	}
}
