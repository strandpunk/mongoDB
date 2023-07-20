const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const mongoDB = require('./config/mongoDB')
const userRouter = require('./routers/userRouter')

dotenv.config()

// set up server

const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))

app.use(express.json())

// connect to mongoDB

mongoDB()

// set up routes

app.use('/auth', userRouter)