const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    content: {
        require: true,
        type: String
    },
    owner: {
        require: true,
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    image: {
        require: true,
        type: String
    },
    city: {
        require: true,
        type: String
    },
    sex: {
        require: true,
        type: String
    }
}, {
    timestamps: true
})

const Data = mongoose.model('Data', DataSchema)

module.exports = Data