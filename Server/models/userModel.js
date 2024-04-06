
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)