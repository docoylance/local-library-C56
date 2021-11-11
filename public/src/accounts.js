const {findAuthorById} = require("./books.js");

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((one, two) => one.name.last < two.name.last ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
   book.borrows.forEach((borrows) => {
    if (borrows.id === account.id){
      total++;
    }
   });
   return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors){
  let userBooks = books.filter((book) => 
    book.borrows.some((borrows) => borrows.id === account.id && borrows.returned === false));
  return userBooks.reduce((result, book) => {
    let bookAuthor = findAuthorById(authors, book.authorId);
    book.author = bookAuthor;
    result.push(book);
    return result;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
