const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Notification = require("../models/notificationModel")

const getDriverNotification = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.body
        const user = await User.findOne({ _id: userId })

        if (user == undefined || user == null) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 })
        }

        if (user.type !== 'driver') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const notfs = await Notification.find({ userId })

        return res.status(200).json({ notfs, status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

const getUserNotification = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.body
        const user = await User.findOne({ _id: userId })

        if (user == undefined || user == null) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 })
        }

        if (user.type !== 'user') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const notfs = await Notification.find({ userId })

        return res.status(200).json({ notfs, status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})


module.exports = {
    getDriverNotification,
    getUserNotification,
}
