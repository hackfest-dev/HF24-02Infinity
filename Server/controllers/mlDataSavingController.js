const asyncHandler = require("express-async-handler");

const liveDeliveryModel = require("../models/liveDeliveryModel");

const mlDataSync = asyncHandler(async (req, res) => {
  const { latitude, longitude, speed, anomalies, penalty } = req.body;
  const driverId = "661051338d2a8c278ee76da3";
  try {
    const result = await liveDeliveryModel.findOne({ driverId: driverId });

    result.speed = speed;
    if (speed > 60) {
      result.speed = result.speed + 1;
    }
    result.anomalies+=anomalies
    result.currentLocation = `${latitude},${longitude}`;
    // result.penalty=result.penalty+penalty
    await result.save();
    // if(result.modifiedCount==1){
    //     return res.status(200).json({ message: 'data synced successfully', status: 200 })
    // } else {
    //     return res.status(500).json({ message: 'Failed to sync data', status: 500 })
    // }
    return res
      .status(200)
      .json({ message: "data synced successfully", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

module.exports = {
  mlDataSync,
};
