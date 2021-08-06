const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const user = require('./routes/api/user')
const post = require('./routes/api/post')

const App = express()
App.use(express.urlencoded({ extended: false }))
App.use(express.json())
App.use(cors())

App.use(passport.initialize())
require('./config/passport')(passport)

const db = require('./config/keys').mongoURL

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

//test route for debugging
App.get('/', (req, res) => {
  res.send('Welcome to PostMe Api !!')
})

App.use('/', user)
App.use('/post', post)

const PORT = process.env.PORT || 5000
App.listen(PORT)
console.log(`APP Started on ${PORT}`)
