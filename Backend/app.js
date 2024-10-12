const config = require('./utils/config')
const middleware = require('./utils/middleware')
require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const questionRouter = require('./controllers/questions')
const replyRouter = require('./controllers/replies')
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
app.use('/api/questions',questionRouter)
app.use('/api/replies',replyRouter)
app.use(middleware.errorHandler)

module.exports = app


