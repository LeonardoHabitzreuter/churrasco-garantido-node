const bcrypt = require('bcrypt')
const User = require('./users')
const errorHandler = require('../../infraestructure/errorHandler')

User.methods(['get', 'put'])
User.updateOptions({new: true, runValidators: true})
User.after('put', errorHandler.handleNodeRestfulErrors)

const emailRegex = /\S+@\S+\.\S+/

const validateUser = ({ email='', password='', passwordHash='', confirmPassword='' }, callback) => {
    if (!email.match(emailRegex)) {
        callback({ errors: ['O e-mail informado está inválido.'] })
    }

    if (password.length < 6 || password.length > 20) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter tamanho entre 6-20."
            ]
        })
    }

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        callback({ errors: ['Senhas não conferem.'] })
    }
    callback()
}

module.exports = {
    UserModel: User,
    validateUser
}