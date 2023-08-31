const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const mongoDB = require('./config/mongoDB')
const userRouter = require('./routers/userRouter')
const dataRouter = require('./routers/dataRouter')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')

dotenv.config()

// set up server

const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}))


// multer 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

app.post('/uploads', upload.single('file'), (req, res) => {
    console.log(req.selectedFile)
})


// connect to mongoDB

mongoDB()

// set up routes

app.use('/auth', userRouter)
app.use('/data', dataRouter)