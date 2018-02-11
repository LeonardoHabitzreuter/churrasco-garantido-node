const express = require('express')
const auth = require('./auth')
const userService = require('../api/users/userService')

module.exports = server => {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const user = require('../api/users/userService')
    user.UserModel.register(protectedApi, '/users')
    server.use('/api/users/:id', userService.updateUser)

    const AuthService = require('../api/users/authService')
    server.post('/login', AuthService.login)
    server.post('/signup', AuthService.signup)
    server.post('/validateToken', AuthService.validateToken)
}