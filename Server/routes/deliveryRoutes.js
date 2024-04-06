const express = require('express')
const router = express.Router()

const { newRequest, getCurrentBids } = require('../controllers/deliveryController')

router.route( '/newrequest' ).post(newRequest)
router.route( '/getbids' ).post(getCurrentBids)

module.exports = router