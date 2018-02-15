const express = require('express')

const auth = require('./auth')
const AuthService = require('../api/users/authService')
const userService = require('../api/users/userService')
const companiesService = require('../api/companies/companiesService')
const order = require('../api/orders/ordersService')

module.exports = server => {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth.authenticate)

    userService.UserModel.register(protectedApi, '/users')
    server.use('/api/users/:id', userService.updateUser)

    companiesService.CompanyModel.register(protectedApi, '/companies')
    server.use('/api/companies', companiesService.createCompany)

    order.model.register(protectedApi, '/orders')
    server.use('/api/orders', order.create)

    server.post('/login', AuthService.login)
    server.post('/signup', AuthService.signup)
    server.post('/validateToken', AuthService.validateToken)
}