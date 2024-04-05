const asyncHandler = require("express-async-handler");
const DeliveryRequest = require("../models/deiveryRequestModel");

const fetch = require('node-fetch');

const calculateDistanceByRoad = async (lat1, lon1, lat2, lon2) => {
    const apiKey = 'AIzaSyC3RXRdq4Q5wONXbWMHAT92JZcXHdtmceE';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${apiKey}&mode=driving`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const distanceText = data.rows[0].elements[0].distance.text;
            const distanceValue = parseFloat(distanceText.split(' ')[0]);
            return distanceValue;
        } else {
            throw new Error(data.error_message || 'Failed to fetch distance data');
        }
    } catch (error) {
        throw new Error('Error fetching distance data:', error.message);
    }
};

const calculatePrice = (weight, height, width, distanceInKm) => {
    // Base price per kilometer (in rupees)
    const basePricePerKm = 50;

    // Calculate volume (assuming height * width * 1 for simplicity)
    const volume = height * width * 1; // Assuming depth is 1 for simplicity

    // Calculate price based on volume and weight
    const priceByVolume = volume * 50; // 5 rupees per unit volume
    const priceByWeight = weight * 200; // 2 rupees per unit weight

    // Calculate total distance-based price
    const distancePrice = distanceInKm * basePricePerKm;

    // Total price
    const totalPrice = priceByVolume + priceByWeight + distancePrice;

    return totalPrice;
};

const newRequest = asyncHandler(async (req, res) => {
    const { weight, height, width, source, destination } = req.body;

    try {
        // Calculate distance by road
        const distanceInKm = await calculateDistanceByRoad(source.lat, source.lon, destination.lat, destination.lon);

        if (distanceInKm !== null) {
            // Calculate total price
            const totalPrice = calculatePrice(weight, height, width, distanceInKm);

            // Save delivery request to database
            await DeliveryRequest.create(req.body);

            return res.status(200).json({ message: 'Request submitted successfully', totalPrice, status: 200 });
        } else {
            return res.status(500).json({ message: 'Failed to calculate distance by road', status: 500 });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', status: 500 });
    }
});

module.exports = {
    newRequest
};
