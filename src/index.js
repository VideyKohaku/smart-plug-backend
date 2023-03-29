const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

// middlewares
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// database
const db = require('./database/db.init')
db.connect()

// routes


module.exports = app
