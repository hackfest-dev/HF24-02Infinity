const asyncHandler = require("express-async-handler")
const DeliveryRequest = require("../models/deiveryRequestModel")
const User = require("../models/userModel")

const fetch = require('node-fetch')

const calculateDistanceByRoad = async (lat1, lon1, lat2, lon2) => {
    
    console.log(lat1, lon1, lat2, lon2)
    
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${apiKey}&mode=driving`

    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.status === 'OK') {
            const distanceText = data.rows[0].elements[0].distance.text
            const distanceValue = parseFloat(distanceText.split(' ')[0])
            return distanceValue
        } else {
            throw new Error(data.error_message || 'Failed to fetch distance data')
        }
    } catch (error) {
        throw new Error('Error fetching distance data:', error.message)
    }
}

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
            const totalPrice = calculatePrice(int(weight), int(height), int(width), int(distanceInKm))

            await DeliveryRequest.create({...req.body, startingBiddingPrice: totalPrice})

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
    const { userId } = req.body

    try {

        const user = await User.findById(userId)

        if(user.type === 'user'){
            return res.status(403).json({ message: 'Access Denied', status: 403 })
        }

        
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', status: 500 })
    }
})

module.exports = {
    newRequest,
    getCurrentBids
}
