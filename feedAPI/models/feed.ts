export interface IUSER {
	userID: string;
	name: string;
	email: string;
}

export interface IBOOK {
	bookID: string;
	name: string;
	image : string;
	createdDate: Date;
	updatedDate: Date;
}

export interface IREVIEW {
	reviewID: string;
	reviwerId: string;
	ReviewedDate : Date;
	review: string;
}

export interface IPOST {
	user: IUSER;
	book: IBOOK;
	reviews : IREVIEW[];
}

