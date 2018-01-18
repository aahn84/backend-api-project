const fs = require('fs');
const ids = require('short-id');
const filePath = './books.json';

const books = JSON.parse(fs.readFileSync(filePath))

function getAllBooks() {
 return books;
}


function getBookById(id) {
  const book = books.find(book => book.id === id)

  if (!book) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  return book;
}


function createBook(name, borrowed, description, authors) {
  const books = getAllBooks()

  const newBook = {
    id: ids.generate(),
    name: name,
    borrowed: borrowed,
    description: description,
    authors: authors.map(author => {
      return {
        id: ids.generate(),
        first_name: author.first_name,
        last_name: author.last_name
      }
    })
  }

  books.push(newBook)
  // fs.writeFileSync(filePath, JSON.stringify(books))

  return newBook;
}
// http POST localhost:3000/books name=hi description=descriptionnnn authors:='[{"first_name": "John", "last_name": "Smith"}]'


function updateBook(id, name, borrowed, description, authors) {
  const book = getBookById(id)

  if (!book) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  book.name = name
  book.description = description
  book.authors = authors
  // book.authors = authors.map(author => {
  //   {
  //     first_name: author.first_name,
  //     last_name: author.last_name
  //   }
  // })
  // fs.writeFileSync(filePath, JSON.stringify(books))

  return book;
}
//update authors in book
// http PUT localhost:3000/books/7fdf60 authors:='[{"first_name":"Patty", "last_name": "Pie"}]'


function deleteBook(id) {
  const book = books.find(book => book.id === id)

  if (!book) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  const index = books.indexOf(book)
  books.splice(index, 1)
  // fs.writeFileSync(filePath, JSON.stringify(books))

  return book;
}


function getAllAuthors(id, name) {
  const book = getBookById(id)
  const authors = book.authors

  if (book.error) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  return authors;
}


function getAuthorById(id, authId) {
  const book = getBookById(id)
  const authors = book.authors

  if (book.error) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  const author = authors.find(author => author.id === authId);
  if (!author) {
    return { error: 404, message: `Author with id ${authId} not found.`}
  }

  return author;
}


function createAuthor(id, first_name, last_name) {
  const book = books.find(book => book.id === id)
  const authors = book.authors

  if (book.error) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  const newAuthor = {
    id: ids.generate(),
    first_name: first_name,
    last_name: last_name
  }
  authors.push(newAuthor)
  // fs.writeFileSync(filePath, JSON.stringify(books))

  return newAuthor;
}
// http POST localhost:3000/books/7fdf60/authors first_name=Patty last_name=Pie


function updateAuthor(id, authId, first_name, last_name) {
  const author = getAuthorById(id, authId)

  if (!author) {
    return { error: 404, message: `Author with id ${authId} not found.`}
  }

  author.first_name = first_name,
  author.last_name = last_name
  // fs.writeFileSync(filePath, JSON.stringify(books))

  return author;
}
// http PUT localhost:3000/books/7fdf60/authors/d6cf0c first_name=Patty last_name=Pie


function deleteAuthor(id, authId) {
  const authors = getAuthorById(id, authId)

  if (book.error) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  const author = authors.find(author => author.id === authId);

  if (!author) {
    return { error: 404, message: `Author with id ${authId} not found.`}
  }

  const index = authors.indexOf(authId)
  authors.splice(index, 1)
  // fs.writeFileSync(filePath, JSON.stringify(books))

  return author;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
}
