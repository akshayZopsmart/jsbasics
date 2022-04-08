enum STATUS {
    ACTIVE,
    COMPLETED,
    NOT_ACTIVE
}
class Todo {
    id: any;
    title: string;
    description: string;
    status: STATUS;
    createdDate: Date;
    updatedDate: Date;
    constructor(object : any) {
        this.id = object.id;
        this.title = object.title;
        this.description = object.description;
        this.status = STATUS.NOT_ACTIVE;
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }
}

export{
    STATUS,
    Todo
}