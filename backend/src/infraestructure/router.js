const express = require('express')
const auth = require('./auth')

module.exports = function (server) {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    // const products = require('../api/products/productsService')
    // products.register(protectedApi, '/products')

    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/users/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}