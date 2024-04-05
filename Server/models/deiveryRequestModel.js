
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
    weight: {
        type: String
    },
    height: {
        type: String
    },
    width: {
        type: String
    },
    image: {
        type: String,
    },
    date: {
        type: String
    },
    startingBiddingPrice: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('DeliveryRequest', deliveryRequestSchema)