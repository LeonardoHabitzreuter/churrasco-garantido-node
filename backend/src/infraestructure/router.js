const express = require('express')

const auth = require('./auth')
const AuthService = require('../api/users/authService')
const user = require('../api/users/userService')
const userService = require('../api/users/userService')
const company = require('../api/companies/companiesService')
const companiesService = require('../api/companies/companiesService')
const order = require('../api/orders/ordersService')

module.exports = server => {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    user.UserModel.register(protectedApi, '/users')
    server.use('/api/users/:id', userService.updateUser)

    company.CompanyModel.register(protectedApi, '/companies')
    server.use('/api/companies', companiesService.createCompany)

    order.register(protectedApi, '/orders')

    server.post('/login', AuthService.login)
    server.post('/signup', AuthService.signup)
    server.post('/validateToken', AuthService.validateToken)
}