const port = 3001

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')
const logger = require('morgan')

server.use(logger(':date :method :url :status :res[content-length] - :response-time ms'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, () => {})

module.exports = server
