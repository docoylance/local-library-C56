function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = [];
  const returned = [];
  books.forEach((book) => {
    if (book.borrows.some((borrows) => borrows.returned === false)){
      checkedOut.push(book);
    } else {
      returned.push(book);
    }
  });
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.reduce((acc, borrow) => {
    let foundAccountId = accounts.find((account) => account.id === borrow.id);
    foundAccountId.returned = borrow.returned;
    if (acc.length < 10){
      acc.push(foundAccountId);
    }
    return acc;
  }, [])
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
