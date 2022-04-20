import { books, booksList } from "../models/book";
export const postBooksService = (bookObject: books) => {
	booksList.push(bookObject);
};

export const getBooksService = () => {
	return booksList;
};
export const getBooksByUserService = (userID: string) => {
	return booksList.filter((book) => book.publisherID === userID);
};

export const getBooksByIDService = (bookID: string) => {
	return booksList.find((book) => book.bookID === bookID);
};

export const getBooksIDService = (bookID: string) => {
	return booksList.findIndex((book) => book.bookID === bookID);
};

export const updateBookService = (book: books, name: string) => {
	book.name = name || book.name;
	book.updatedDate = new Date();
};

export const deleteBookService = (bookIndex: number) => {
    booksList.splice(bookIndex, 1);
};
