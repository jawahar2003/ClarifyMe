const config = require('./utils/config')
const errorHandler = require('./utils/middleware')
require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()


//mongoose connection
console.log(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI).then(()=>{
    console.log('connected to DB')
}).catch((error) => {
    console.log(`Error connecting to db: ${error.message}`)
})


//middlewares
app.use(express.json())

app.use('/api/users',userRouter)
app.use('/api/users',loginRouter)
app.use(errorHandler)

module.exports = app

