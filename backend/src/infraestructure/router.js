const express = require('express')
const auth = require('./auth')

module.exports = server => {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    // const products = require('../api/products/productsService')
    // products.register(protectedApi, '/products')

    const AuthService = require('../api/users/authService')
    server.post('/login', AuthService.login)
    server.post('/signup', AuthService.signup)
    server.post('/validateToken', AuthService.validateToken)
}