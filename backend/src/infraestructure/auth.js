const jwt = require('jsonwebtoken')
const env = require('../.env')

const getRequestUserId = token => {
    var teste = jwt.verify(token, env.authSecret)
    return teste.id
}

const verifyToken = (req, res, next) => {
    const returnTokenInvalid = () => res.status(403).send({errors: ['Failed to authenticate token.']})

    const token = req.headers['authorization']

    if (!token) return res.status(403).send({ errors: ['No token provided.'] })

    jwt.verify(token, env.authSecret, (err, decoded) => {
        err
           ? returnTokenInvalid()
           : next() 
    })
}

module.exports = {
    authenticate: (req, res, next) => {
        req.method === 'OPTIONS'
            ? next()
            : verifyToken(req, res, next)
    },
    getRequestUserId
}