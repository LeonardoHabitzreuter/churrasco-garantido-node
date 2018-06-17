const bcrypt = require('bcryptjs')
const _ = require('lodash')
const R = require('ramda')
const User = require('./users')
const errorHandler = require('../../infraestructure/errorHandler')
const { passwordValidator, fieldsValidator, emailValidator } = require('../validations/index')
const emailRegex = /\S+@\S+\.\S+/

User.methods(['get'])
User.updateOptions({new: true, runValidators: true})
User.after('put', errorHandler.handleNodeRestfulErrors)

const updateUser = (req, res, next) => {
  if (req.method === 'PUT') {
    const { name = '', email = '', password = '', confirmPassword = '' } = req.body
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(req.body.password, salt)

    const saveUser = errors => {
      if (errors) return res.status(400).send({ errors })

      User.update({ _id: req.params.id }, { $set: {
        name,
        email,
        password: passwordHash
      }}, saveErr => (
        !saveErr
          ? res.status(200).send()
          : errorHandler.handleMongoDBErrors(res, saveErr))
      )
    }

    getValidationErrors({ id: req.params.id, name, email, password, passwordHash, confirmPassword }, saveUser)
  } else {
    next()
  }
}

const getValidationErrors = ({ id = null, name, email, password, passwordHash, confirmPassword }, callback) => {
  const checkErrors = R.pipe(
    fieldsValidator.getErrors([
      { name: 'senha', value: password, minLength: 6, maxLength: 20 },
      { name: 'nome', value: name, minLength: 6 }]),
    emailValidator.validate(email, emailRegex),
    passwordValidator.validate(confirmPassword, passwordHash)
  )

  const errors = checkErrors()

  if (!R.isEmpty(errors)) {
    callback(errors)
    return
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      _.forIn(err.errors, error => errors.push(error.message))
      callback(errors)
      return
    }

    if (user && user.id !== id) {
      const emailAlreadyAssigned = ['Email já cadastrado.']
      callback(emailAlreadyAssigned)
    }
    callback()
  })
}

module.exports = {
  UserModel: User,
  getValidationErrors,
  updateUser
}
