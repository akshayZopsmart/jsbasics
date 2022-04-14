interface books{
    bookID: string,
    publisherID: string,
    name: string,
    publishedDate: Date,
}

const booksList: Array<books> = [];

const getBookID = (id: string) => {
	return booksList.find((book) => book.bookID === id);
};

const getBookName = (name: string) => {
	return booksList.filter((user) => user.name === name);
};

const errorMessage = (id: string) => {
	return `ID : ${id} is not found` ;
};

export { booksList, getBookID, getBookName, errorMessage };

