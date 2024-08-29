const express = require('express')
const registrationRouter = require('./controllers/register')
const app = express()

//middlewares
app.use(express.json())
app.use('/api/register',registrationRouter)

module.exports = app