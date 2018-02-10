const express = require('express')
const auth = require('./auth')

module.exports = server => {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const user = require('../api/users/userService')
    user.UserModel.register(protectedApi, '/users')

    const AuthService = require('../api/users/authService')
    server.post('/login', AuthService.login)
    server.post('/signup', AuthService.signup)
    server.post('/validateToken', AuthService.validateToken)
}