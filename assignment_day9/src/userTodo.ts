enum STATUS {
    ACTIVE,
    COMPLETED,
    NOT_ACTIVE
}
class Todo{
    id: any;
    title: string;
    description: string;
    status: STATUS;
    createdDate: Date;
    updatedDate: Date;
    constructor(id:any, title:string, description:string,status:STATUS) {
                this.id = id;
                this.title = title;
                this.description = description;
                this.status = status;
                this.createdDate = new Date();
                this.updatedDate = new Date();
    }
}


module.exports = {
    Todo, STATUS
}