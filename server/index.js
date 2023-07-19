const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const db = require('./config/db')

dotenv.config()

// set up server

const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))

db()

