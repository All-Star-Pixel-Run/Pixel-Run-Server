const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true}))
    .use('/', router)
    .use(errorHandler)

module.exports = app
