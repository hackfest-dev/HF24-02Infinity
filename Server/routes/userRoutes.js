const express = require('express')
const router = express.Router()

const { register, login, customers } = require('../controllers/userController')

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/getCutomers').post(customers)


module.exports = router