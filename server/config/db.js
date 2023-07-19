const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL

const MongoDB = async () => {
    try {
        const con = await mongoose.connect(MONGODB_URL)
        console.log('MongoDB connected: ' + con.connection.host)
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = MongoDB