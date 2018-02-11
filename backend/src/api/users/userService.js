const bcrypt = require('bcrypt')
const User = require('./users')
const errorHandler = require('../../infraestructure/errorHandler')
const _ = require('lodash')
const emailRegex = /\S+@\S+\.\S+/

User.methods(['get'])
User.updateOptions({new: true, runValidators: true})
User.after('put', errorHandler.handleNodeRestfulErrors)

const updateUser = (req, res, next) => {
    if (req.method === 'PUT') {
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(req.body.password, salt)
        
        const saveUser = err => {
            if (err) return errorHandler.handleMongoDBErrors(res, err)
            
            User.update({ _id: req.params.id }, { $set: { ...req.body, password: passwordHash }}, saveErr => {
                if (saveErr) return errorHandler.handleMongoDBErrors(res, saveErr)

                return res.status(200).send()
            })
        }

        validateUser({ ...req.body, passwordHash }, saveUser)
    } else {
        next()
    }
}

const validateUser = ({ email='', password='', passwordHash='', confirmPassword='' }, callback) => {
    const errors = []

    if (!email.match(emailRegex)) errors.push('O e-mail informado está inválido.')

    if (password.length < 6 || password.length > 20) errors.push('Senha precisar ter tamanho entre 6-20.')

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) errors.push('Senhas não conferem.')

    callback(_.some(errors) ? { errors } : null)
}

module.exports = {
    UserModel: User,
    validateUser,
    updateUser
}