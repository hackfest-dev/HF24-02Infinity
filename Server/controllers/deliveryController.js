const asyncHandler = require("express-async-handler")
const DeliveryRequest = require("../models/deiveryRequestModel")
const User = require("../models/userModel")
const Notification = require("../models/notificationModel")

const fetch = require('node-fetch')
const LiveDelivery = require("../models/liveDeliveryModel")

const calculateDistanceByRoad = async (lat1, lon1, lat2, lon2) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${apiKey}&mode=driving`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const distanceText = data.rows[0].elements[0].distance.text;
            const distanceValue = parseFloat(distanceText.split(' ')[0]);
            return distanceValue;
        } else {
            console.error('Google Maps API error:', data.error_message || 'Failed to fetch distance data');
            return null;
        }
    } catch (error) {
        console.error('Error fetching distance data:', error.message);
        return null;
    }
};

const calculatePrice = (weight, height, width, distanceInKm) => {
    // Base price per kilometer (in rupees)
    const basePricePerKm = 50

    // Calculate volume (assuming height * width * 1 for simplicity)
    const volume = height * width * 1 // Assuming depth is 1 for simplicity

    // Calculate price based on volume and weight
    const priceByVolume = volume * 50 // 5 rupees per unit volume
    const priceByWeight = weight * 200 // 2 rupees per unit weight

    const distancePrice = distanceInKm * basePricePerKm

    const totalPrice = priceByVolume + priceByWeight + distancePrice

    return totalPrice
}

const newRequest = asyncHandler(async (req, res) => {
    const { weight, height, width, source, destination } = req.body

    try {

        const sourceLat = source.split(',')[0]
        const sourceLon = source.split(',')[1]
        const destLat = destination.split(',')[0]
        const destLon = destination.split(',')[1]
        const distanceInKm = await calculateDistanceByRoad(sourceLat, sourceLon, destLat, destLon)

        if (distanceInKm !== null) {
            const totalPrice = calculatePrice(parseInt(weight), parseInt(height), parseInt(width), parseInt(distanceInKm))

            const { _id } = await DeliveryRequest.create({ ...req.body, startingBiddingPrice: totalPrice, currentBiddingPrice: totalPrice })

            const intl = setInterval(async () => {

                const request = await DeliveryRequest.findById(_id)

                if (request && request.currentWaitList.length === 0) {
                    const currentDate = new Date()
                    // const threeHoursLater = new Date(currentDate.getTime() + (3 * 60 * 60 * 1000))
                    const threeHoursLater = new Date(currentDate.getTime() + (60 * 1000))
                    request.bidEndDate = threeHoursLater
                    request.save()
                    return
                } else if (request && request.currentWaitList.length > 0) {
                    const driverId = request.currentWaitList[0].userId
                    await Notification.create({
                        userId: driverId,
                        description: 'You have won the bidding of the shipment name: ' + this.name
                    })

                    await Notification.create({
                        userId: req.body.userId,
                        description: 'Your delivery request is forwarded to delivery driver'
                    })

                    await LiveDelivery.create({
                        name: request.name,
                        source: request.source,
                        destination: request.destination,
                        description: request.description,
                        weight: request.weight,
                        height: request.height,
                        width: request.width,
                        image: request.image,
                        date: request.date,
                        price: request.currentBiddingPrice,
                        userId: req.body.userId,
                        driverId
                    })

                    await DeliveryRequest.findOneAndDelete({ _id: request._id })

                    clearInterval(intl)
                }
            }, 60000)

            return res.status(200).json({ message: 'Request submitted successfully', totalPrice, status: 200 })
        } else {
            return res.status(500).json({ message: 'Failed to calculate distance by road', status: 500 })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

const getCurrentBids = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.body
        const user = await User.findOne({ _id: userId })

        if (user == undefined || user == null) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 })
        }

        if (user.type === 'user') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const currentDate = new Date()
        const bids = await DeliveryRequest.find({ bidEndDate: { $gt: currentDate } })

        return res.status(200).json({ bids, status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

const joinWaitList = asyncHandler(async (req, res) => {

    try {
        const { userId, deliveryId } = req.body

        const driver = await User.findOne({ _id: userId })

        if (!driver || driver.type !== 'driver') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const currentDate = new Date()
        const bid = await DeliveryRequest.findOne({ _id: deliveryId })
        if (bid === null || bid === undefined) {
            return res.status(400).json({ message: 'Bad request', status: 400 })
        }

        var flag = false
        bid.currentWaitList.map((value, key) => {
            if (value.userId === userId) {
                return flag = true
            }
        })

        if (flag) {
            return res.status(200).json({ message: 'You are already present in waiting list', status: 200 })
        }

        bid.currentWaitList.push({
            userId, date: currentDate
        })

        const updatedBid = await bid.save()

        return res.status(200).json({ message: 'Added to waiting list', status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

const lowerBid = asyncHandler(async (req, res) => {

    try {
        const { userId, deliveryId, lowerAmount } = req.body

        const driver = await User.findOne({ _id: userId })

        if (!driver || driver.type !== 'driver') {
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        const currentDate = new Date()


        const bid = await DeliveryRequest.findOne({ _id: deliveryId })

        if (bid === null || bid === undefined) {
            return res.status(400).json({ message: 'Bad request', status: 400 })
        }

        bid.currentWaitList = [{
            userId,
            date: currentDate
        }]
        bid.currentBiddingPrice = lowerAmount

        await bid.save()

        return res.status(200).json({ message: 'Lowered the bid successfully', status: 200 })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

module.exports = {
    newRequest,
    getCurrentBids,
    joinWaitList,
    lowerBid
}
