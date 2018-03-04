const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./users')
const UserService = require('./userService')
const authSecret = process.env.authSecret || require('../../.env').authSecret
const errorHandler = require('../../infraestructure/errorHandler')

const login = (req, res, next) => {
    const { email='', password='' } = req.body

    User.findOne({ email }, (err, user) => {
        if (err) {
            return errorHandler.handleMongoDBErrors(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({id: user.id}, authSecret, {
                expiresIn: '6h'
            })
            res.json({ userId: user.id, token })
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''

    jwt.verify(token, authSecret, (err, decoded) => {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const { name='', email='', password='', confirmPassword='' } = req.body
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    const createUser = errors => {
        if (_.some(errors)) return res.status(400).send({ errors })

        const newUser = new User({ name, email, password: passwordHash })
        newUser.save(err => {
            if (err) return errorHandler.handleMongoDBErrors(res, err)

            login(req, res, next)
        })
    }

    UserService.getValidationErrors({ name, email, password, passwordHash, confirmPassword }, createUser)
}

module.exports = { login , signup, validateToken }