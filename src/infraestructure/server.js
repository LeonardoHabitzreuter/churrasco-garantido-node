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

// https://aghassi.github.io/ssl-using-express-4/
// var fs = require('fs')
// const credentials = {
//   key: fs.readFileSync('sslcert/key.pem'),
//   cert: fs.readFileSync('sslcert/cert.pem')
// }
// const https = require('https')
// https
//   .createServer(credentials, server)
//   .listen(port, '0.0.0.0', () => console.log('server running on port 3001'))
server.listen(port, '0.0.0.0', () => console.log('server running on port 3001'))

module.exports = server
