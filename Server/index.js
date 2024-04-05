const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorMiddleware')
const cors = require("cors")

connectDB()

app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use(cors())

app.use('/api/user', require('./routes/userRoutes'))

app.use('/', (req, res) => {
    res.status(400).json({message: "Page Not found"})
})

app.use(errorHandler)

const port = process.env.PORT || 5001
app.listen( port, () => console.log(`Server started at port ${port}`) )
