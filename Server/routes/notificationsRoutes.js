const express = require('express')
const router = express.Router()

const { getDriverNotification, getUserNotification } = require('../controllers/notificationController')

router.route( '/getdrivernotification' ).post(getDriverNotification)
router.route( '/getusernotification' ).post(getUserNotification)

module.exports = router