export interface books {
	bookID: string;
	publisherID: string;
	name: string;
	publishedDate: Date;
	updatedDate: Date;
}

export const booksList: Array<books> = [];
