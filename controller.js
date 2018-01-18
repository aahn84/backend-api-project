const model = require('./model')

const getAllBooksCtrl = (req, res, next) => {
  const books = model.getAllBooks()

  res.status(200).json({data: books})
}


const getBookByIdCtrl = (req, res, next) => {
  const id = req.params.id

  if (!id) return next({status: 400, message: `Please provide a book ID`})

  const book = model.getBookById(id)

  if (book.error) {
    let { error, message } = book;
    return res.status(error).json({ error: { message }})
  }

  res.status(200).json({data: book})
}


const createBookCtrl = (req, res, next) => {
  const { name, borrowed, description, authors } = req.body

  if (!name || !description || !authors) return next({status: 400, message: `Name, description, and authors are required`})

  const book = model.createBook(name, borrowed, description, authors)

  res.status(201).json({data: book})
}


const updateBookCtrl = (req, res, next) => {
  const id = req.params.id
  const {name, borrowed, description, authors} = req.body

  if (!id) return next({status: 400, message: `Please provide a book ID`})

  const book = model.updateBook(id, name, borrowed, description, authors)

  if (book.error) {
    let { error, message } = book;
    return res.status(error).json({ error: { message }})
  }

  res.status(201).json({data: book})
}


const deleteBookCtrl = (req, res, next) => {
  const id = req.params.id

  if (!id) return next({status: 400, message: `Please provide a book ID`})

  const book = model.deleteBook(id)

  if (book.error) {
    let { error, message } = book;
    return res.status(error).json({ error: { message }})
  }

  res.status(200).json({data: book})
}


const getAllAuthorsCtrl = (req, res, next) => {
  const id = req.params.id
  const name = req.body.name

  if (!id) return next({status: 400, message: `Please provide a book ID or Name`})

  const authors = model.getAllAuthors(id, name)

  if (authors.error) {
    let { error, message } = authors;
    return res.status(error).json({error: { message }})
  }

  res.status(200).json({data: authors})
}


const getAuthorByIdCtrl = (req, res, next) => {
  const id = req.params.id
  const authId = req.params.authId

  if (!id || !authId) return next({status: 400, message: `Book ID and Author ID required`})

  const author = model.getAuthorById(id, authId)

  if (author.error) {
    let { error, message } = author;
    return res.status(error).json({ error: { message }})
  }

  res.status(200).json({data: author})
}


const createAuthorCtrl = (req, res, next) => {
  const id = req.params.id
  const {first_name, last_name} = req.body

  if (!id || !first_name || !last_name) return next({status: 400, message: `Book ID, author first_name and author last_name are required.`})

  const author = model.createAuthor(id, first_name, last_name)

  if (author.error) {
    let { error, message } = author;
    return res.status(error).json({ error: { message }})
  }

  res.status(201).json({data: author})
}


const updateAuthorCtrl = (req, res, next) => {
  const id = req.params.id
  const authId = req.params.authId
  const {first_name, last_name} = req.body

  if (!id || !authId) return next({status: 400, message: `Book ID, author first_name and author last_name are required.`})

  const author = model.updateAuthor(id, authId, first_name, last_name)

  if (author.error) {
    let { error, message } = author;
    return res.status(error).json({ error: { message }})
  }

  res.status(201).json({data: author})
}


const deleteAuthorCtrl = (req, res, next) => {
  const id = req.params.id
  const authId = req.params.authId

  if (!id || !authId) return next({status: 400, message: `Book ID and Author ID required`})

  const author = model.deleteAuthor(id, authId)

  if (author.error) {
    let { error, message } = author;
    return res.status(error).json({ error: { message }})
  }

  res.status(200).json({data: author})
}

module.exports = {
  getAllBooksCtrl,
  getBookByIdCtrl,
  createBookCtrl,
  updateBookCtrl,
  deleteBookCtrl,
  getAllAuthorsCtrl,
  getAuthorByIdCtrl,
  createAuthorCtrl, // http url path create?
  updateAuthorCtrl,
  deleteAuthorCtrl
}
