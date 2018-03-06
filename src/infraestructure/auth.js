const jwt = require('jsonwebtoken')
const authSecret = process.env.authSecret || require('../.env').authSecret

const getTestToken = () => jwt.sign({id: '5a84ad9f60d49723c78e434a'}, authSecret, { expiresIn: '1h' })

const getRequestUserId = token => {
  var teste = jwt.verify(token, authSecret)
  return teste.id
}

const verifyToken = (req, res, next) => {
  const returnTokenInvalid = () => res.status(403).send({errors: ['Failed to authenticate token.']})

  const token = req.headers['authorization']

  if (!token) return res.status(403).send({ errors: ['No token provided.'] })

  jwt.verify(token, authSecret, (err, decoded) => {
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
  getRequestUserId,
  getTestToken
}
