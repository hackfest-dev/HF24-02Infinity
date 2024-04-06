const express = require('express')
const router = express.Router()

const { mlDataSync} = require('../controllers/mlDataSavingController')

router.route( '/mldatasync' ).post(mlDataSync)


module.exports = router