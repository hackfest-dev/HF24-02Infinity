const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');


const register = asyncHandler(async (req, res) => {

  const saltRounds = 10;

  const { email, mobileNumber, password, rePassword, type } = req.body

  if (email === undefined || email === null) {
    return res
      .status(400)
      .json({ message: "User email required", status: 400 })
  }

  if (mobileNumber === null || password === null || mobileNumber === undefined || password === undefined) {
    return res
      .status(400)
      .json({ message: "Please fill all the details", status: 400 })
  }

  if (type !== 'admin' && type !== 'user' && type !== 'driver') {
    return res
      .status(400)
      .json({ message: "Specify correct user type", status: 400 })
  }

  if (password !== rePassword) {
    return res
      .status(400)
      .json({ message: "Both passwords must match", status: 400 })
  }

  try {

    const user = await User.findOne({ email }, { _v: 0, _id: 1, email: 0 })
    if (user) {
      return res
        .status(400)
        .json({ message: "Account already exists", status: 400 })
    }
    const workFactor = 8
    bcrypt
      .genSalt(workFactor)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(async hash => {
        const user = await User.create({
          email, password: hash, mobileNumber, type
        })

        res.status(200).json({ 'message': 'Registration successful', status: 200 })
      })
      .catch(err => console.error(err.message))

  } catch (err) {
    res.status(500)
    throw new Error(err.message)
  }

})

const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  if (email === null || password === null || email === undefined || password === undefined) {
    return res
      .status(400)
      .json({ message: "Please fill all the details", status: 400 })
  }

  const user = await User.findOne({ email }, { _v: 0, _id: 1, email: 0 })

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      res.status(200).json({ data: user, message: 'Login successful', status: 200 })
    }
    else {
      res.status(401).json({ message: 'Login Unuccessful', status: 401 })
    }
  })

})

module.exports = {
  register,
  login
}
