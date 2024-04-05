const express = require('express')
const router = express.Router()

const { newRequest } = require('../controllers/deliveryController')

router.route( '/newrequest' ).post(newRequest)

module.exports = router