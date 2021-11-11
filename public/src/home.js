function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = 0;
  for (let book of books){
    if (book.borrows.some((borrows) => borrows.returned === false)){
      result++;
    }
  }
  return result;
}

const sortAndSlice = (arr) => {
  return arr.sort((one, two) => two.count - one.count).slice(0, 5);
}

function getMostCommonGenres(books) {
  let booksReduced = books.reduce((acc, book) => {
    let obj = {};
    obj.name = book.genre;
    obj.count = 1;
    acc.map((genre) => genre.name).includes(obj.name) ? 
      acc.find((genre) => genre.name === obj.name).count++ : 
      acc.push(obj);
    return acc;
  }, [])
  return sortAndSlice(booksReduced);
}

function getMostPopularBooks(books) {
  let booksReduced = books.reduce((acc, book) => {
    let obj = {};
    obj.name = book.title;
    obj.count = book.borrows.length;
    acc.push(obj);
    return acc;
  }, [])
  return sortAndSlice(booksReduced);
}

function getMostPopularAuthors(books, authors) {
  let authorsReduced = authors.reduce((acc, author) => {
    let obj = {};
    obj.name = `${author.name.first} ${author.name.last}`;
    obj.count = books.reduce((count, book) => {
      if (book.authorId === author.id){
        count += book.borrows.length;
      }
      return count;
    }, 0);
    acc.push(obj);
    return acc;
  }, []);
  return sortAndSlice(authorsReduced);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
