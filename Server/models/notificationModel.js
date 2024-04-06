
const mongoose = require('mongoose')

function getDefaultNotifStartDate() {
    const currentDate = new Date()
    const threeHoursLater = new Date(currentDate.getTime() + (3 * 60 * 60 * 1000))
    return threeHoursLater
}

const notificationSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    description: {
        type: String
    },
    notificationStartDate: {
        type: Date,
        default: getDefaultNotifStartDate
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema)