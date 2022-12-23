require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// DB INITIALIZATION
require('./models/db')

//Middlewares
app.use(cors()) //TODO: Add cors configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Importing Routes
const user = require('./routes/user')
const vehicle = require('./routes/vehicle')
const sticker = require('./routes/sticker')
const department = require('./routes/department')

// Routes setup
app.use('/', user)
app.use('/vehicle', vehicle)
app.use('/sticker', sticker)
app.use('/department', department)

app.listen('5000', () => {
  console.log('Server is listening at port 5000')
})
