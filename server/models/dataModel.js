const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    content:{
        require: true,
        type: String
    },
    owner:{
        require: true,
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestaps: true
})

const Data = mongoose.model('Data', DataSchema)

module.exports = Data