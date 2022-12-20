const express = require('express')
const app = express()

require('./models/db')

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen('5000', () => {
  console.log('Server is listening at port 5000')
})
