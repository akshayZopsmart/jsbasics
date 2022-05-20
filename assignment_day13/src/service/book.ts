const db = require("../database/db");

export const postBooksService = async (bookObject: any) => {
	return await db("books")
		.insert(bookObject)
		.then(() => {
			return bookObject;
		})
		.catch((err: any) => {
			throw new Error(err.message);
		});
};

export const getBooksService = async (ctx: any) => {
	return await db.select().table('books')	
};
export const getBooksByUserService = async (userID: string) => {
	return await db("books")
		.where({publisherID: userID})
		.then((book: any) => {
			return book;
		})
		.catch((err: any) => {
			throw new Error(err.message);
		})
}

export const getBookByIDService = async (bookID: string) => {
	return await db("books")
		.where({ bookID })
		.then((book: any) => {
			return book;
		})
		.catch((err: any) => {
			throw new Error(err.message);
		});
};

export const updateBookService = async (bookID : string, name: string) => {
	return await db("books").where({bookID}).update({name});
};

export const deleteBookService = async (bookID: string) => {
	return await db("books").where({ bookID }).del();
};
