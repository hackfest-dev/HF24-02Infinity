const asyncHandler = require("express-async-handler");
const DeliveryRequest = require("../models/deiveryRequestModel")


const newRequest = asyncHandler(async (req, res) => {

    const { weight, height, width, source, destination } = req.body

    try {

        //Maps API Integration

        await DeliveryRequest.create(req.body)

        return res
        .status(200)
        .json({ message: 'Request submitted successfully', status: 200 })

    } catch (err) {
        res.status(500)
        throw new Error(err.message)
    }

})

module.exports = {
    newRequest
}
