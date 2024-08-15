const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

const user = require('./routes/api/user')
const post = require('./routes/api/post')

const App = express()
App.use(express.urlencoded({ extended: false }))
App.use(express.json())
App.use(cors())

App.use(passport.initialize())
require('./config/passport')(passport)

mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error - ${err}`));


//test route for debugging
App.get('/helloworld', (req, res) => {
  res.send('Welcome to PostMe API !!')
})

App.use('/', user)
App.use('/post', post)

const PORT = process.env.PORT || 5000
App.listen(PORT)
console.log(`APP Started on ${PORT}`)
