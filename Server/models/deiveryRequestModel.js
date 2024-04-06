
const Notification = require('./notificationModel')

const mongoose = require('mongoose')


function getDefaultBidEndDate() {
    const currentDate = new Date()
    // const threeHoursLater = new Date(currentDate.getTime() + (3 * 60 * 60 * 1000))
    const threeHoursLater = new Date(currentDate.getTime() + (60 * 1000))
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

// deliveryRequestSchema.pre('save', async function (next) {

//     if (this.bidEndDate <= new Date()) {
//         const driverId = this.currentWaitList.length > 0 ? this.currentWaitList[0].userId : null

//         if (driverId) {

//             await Notification.create({
//                 userId: driverId,
//                 description: 'You have won the bidding of the shipment name: ' + this.name
//             })

//             await Notification.create({
//                 userId: this.userId,
//                 description: 'Your delivery request is forwarded to delivery driver'
//             })

//         } else {
//             this.bidEndDate = new Date(this.bidEndDate.getTime() + (3 * 60 * 60 * 1000))
//         }
//     }
//     next()
// })

module.exports = mongoose.model('DeliveryRequest', deliveryRequestSchema)