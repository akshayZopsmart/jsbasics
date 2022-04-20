
export class NotFoundError extends Error {
    status : number
    constructor(value : string) {
        super(`${value} is not found`);
        this.status = 404;
    }
}



