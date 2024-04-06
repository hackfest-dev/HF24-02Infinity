
const mongoose = require('mongoose')

const liveDeliverySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    driverId: {
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
    price: {
        type: Number
    },
    anomaly: [],
    penalty: {
        type: Number,
        default: 0
    },
    speed: {
        type: String
    },
    currentLocation: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('LiveDelivery', liveDeliverySchema)