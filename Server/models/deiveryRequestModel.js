
const mongoose = require('mongoose')

function getDefaultBidEndDate() {
    const currentDate = new Date()
    const threeHoursLater = new Date(currentDate.getTime() + (3 * 60 * 60 * 1000))
    return threeHoursLater
}

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
    },
    currentBiddingPrice: {
        type: Number
    },
    currentWaitList: [{
        userId: {
            type: String
        },
        dateTime: {
            type: Date,
            default: Date.now
        }
    }],
    bidEndDate: {
        type: Date,
        default: getDefaultBidEndDate
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('DeliveryRequest', deliveryRequestSchema)