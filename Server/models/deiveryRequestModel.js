
const mongoose = require('mongoose')

const deliveryRequestSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    source: {
        type: String
    },
    destination: {
        type: String
    },
    description: {
        type: String
    },
    goodsType: {
        type: String,
    },
    image: {
        type: String,
    },
    date: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('DeliveryRequest', deliveryRequestSchema)