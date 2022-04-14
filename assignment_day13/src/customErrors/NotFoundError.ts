import { errorMessage } from "../bookImp/books"

export class NotFoundError extends Error {
    status : number
    constructor(id: string) {
        super(errorMessage(id));
        this.status = 404;
    }
}



