const express = require('express')
const router = express.Router()

const { newRequest, getCurrentBids, joinWaitList, lowerBid } = require('../controllers/deliveryController')

router.route( '/newrequest' ).post(newRequest)
router.route( '/getbids' ).post(getCurrentBids)
router.route( '/joinwaitlist' ).post(joinWaitList)
router.route( '/lowerbid' ).post(lowerBid)

module.exports = router