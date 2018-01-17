const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use(morgan('dev'))
app.use(bodyParser.json())


app.get('/', (req, res, next) => {
  console.log(`HIYEE`)
})

app.use((err, req, res, next) => {
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
