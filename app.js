const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
const controller = require('./controller')
const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use(morgan('dev'))
app.use(bodyParser.json())


// BOOKS routes
app.get('/books', controller.getAllBooksCtrl)
app.get('/books/:id', controller.getBookByIdCtrl)
app.post('/books', controller.createBookCtrl)
app.put('/books/:id', controller.updateBookCtrl)
app.delete('/books/:id', controller.deleteBookCtrl)

// AUTHORS routes
app.get('/books/:id/authors', controller.getAllAuthorsCtrl)
app.get('/books/:id/authors/:authId', controller.getAuthorByIdCtrl)
app.post('/books/:id/authors', controller.createAuthorCtrl)
app.put('/books/:id/authors/:authId', controller.updateAuthorCtrl)
app.delete('/books/:id/authors/:authId', controller.deleteAuthorCtrl)


app.use((err, req, res, next) => {
  // console.log('ERROR!!!', err);
  const status = err.status || 500
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: `Not found`}})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
