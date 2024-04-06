const express = require('express')
const router = express.Router()

const { getDriverBasicDetails, getAdminBasicDetails, getUserBasicDetails } = require('../controllers/dashboardController')

router.route( '/driver' ).post(getDriverBasicDetails)
router.route( '/admin' ).post(getAdminBasicDetails)
router.route( '/user' ).post(getUserBasicDetails)

module.exports = router