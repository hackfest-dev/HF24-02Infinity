const asyncHandler = require("express-async-handler");

const liveDeliveryModel = require("../models/liveDeliveryModel");

const mlDataSync = asyncHandler(async (req, res) => {
  const { latitude, longitude, averageSpeed, anomalies, penalty, driverId, speedViolation } = req.body
  try {
    const delivery = await liveDeliveryModel.findOne({ driverId: driverId })

    if(delivery) {
      return res
      .status(400)
      .json({ message: "Check your id", status: 400 })
    }

    delivery.anomalies += anomalies
    delivery.currentLocation = `${latitude},${longitude}`
    delivery.avgSpeed = averageSpeed
    delivery.penalty = penalty
    delivery.speedViolation = speedViolation
    
    const updated = await delivery.save()

    if(updated === null){
      return res
      .status(500)
      .json({ message: "Failed to sync data", status: 500 })
    }else {
      return res
          .status(200)
          .json({ message: "data synced successfully", status: 200 })
    }

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal server error", status: 500 })
  }
})

module.exports = {
  mlDataSync
}
