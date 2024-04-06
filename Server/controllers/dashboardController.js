const asyncHandler = require("express-async-handler")
const DeliveryRequest = require("../models/deiveryRequestModel")
const User = require("../models/userModel")
const Notification = require("../models/notificationModel")

const LiveDelivery = require("../models/liveDeliveryModel")

const getDriverBasicDetails = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.body
        const driver = await User.findOne({ _id: userId }, { _v: 0, _id: 0 })

        if (driver == undefined || driver == null) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 })
        }

        if (driver.type !== 'driver') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const admin = await User.findOne({ type: 'admin' }, { _id: 0, _v: 0 })
        const deliveries = await LiveDelivery.find({ driverId: userId })

        let customersList = [admin]
        deliveries.forEach(async element => {
            customersList.push(await User.findOne({ _id: element.userId }, { _id: 0, _v: 0 }))
        })

        const driversCount = await User.countDocuments({ type: 'driver' })
        const customersCount = await User.countDocuments({ type: 'user' })
        const fleetCount = await LiveDelivery.countDocuments({ driverId: userId })

        return res.status(200).json({ driver: { email: driver.email, mobileNumber: driver.mobileNumber }, customersList, customersCount, driversCount, fleetCount, status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

const getAdminBasicDetails = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.body
        const admin = await User.findOne({ _id: userId }, { _v: 0, _id: 0 })

        if (admin == undefined || admin == null) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 })
        }

        if (admin.type !== 'admin') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const deliveries = await LiveDelivery.find({})

        let customersList = []
        deliveries.forEach(async element => {
            const user = await User.findOne({ _id: element.userId }, { _id: 0, _v: 0 })
            customersList.push(user)
        })

        const driversCount = await User.countDocuments({ type: 'driver' })
        const customersCount = await User.countDocuments({ type: 'user' })
        const fleetCount = await LiveDelivery.countDocuments({})

        const users = await User.find({ type: 'user' })
        const drivers = await User.find({ type: 'driver' })

        return res.status(200).json({ users, drivers, admin, customersList, customersCount, driversCount, fleetCount, status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

const getUserBasicDetails = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.body
        const user = await User.findOne({ _id: userId }, { _v: 0, _id: 0 })

        if (user == undefined || user == null) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 })
        }

        if (user.type !== 'user') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const delivery = await LiveDelivery.find({ userId: userId })

        return res.status(200).json({ delivery, status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

module.exports = {
    getDriverBasicDetails,
    getAdminBasicDetails,
    getUserBasicDetails
}
