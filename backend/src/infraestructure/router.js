const express = require('express')
const auth = require('./auth')
const userService = require('../api/users/userService')
const companiesService = require('../api/companies/companiesService')

module.exports = server => {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const user = require('../api/users/userService')
    user.UserModel.register(protectedApi, '/users')
    server.use('/api/users/:id', userService.updateUser)

    const company = require('../api/companies/companiesService')
    company.CompanyModel.register(protectedApi, '/companies')
    server.use('/api/companies', companiesService.createCompany)

    const AuthService = require('../api/users/authService')
    server.post('/login', AuthService.login)
    server.post('/signup', AuthService.signup)
    server.post('/validateToken', AuthService.validateToken)
}