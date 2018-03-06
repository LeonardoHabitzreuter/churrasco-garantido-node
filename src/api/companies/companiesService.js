const Company = require('./company')
const errorHandler = require('../../infraestructure/errorHandler')
const _ = require('lodash')
const cnpjValidator = require('../cnpjValidator')
const getErrors = require('../entitiesFieldsValidator').getErrors
const auth = require('../../infraestructure/auth')

Company.methods(['get'])

const saveCompany = ({ name, cnpj, creator }, res) => {
  Company.create({ name, cnpj, creator }, saveErr => {
    if (saveErr) return errorHandler.handleMongoDBErrors(res, saveErr)

    res.status(200).send()
  })
}

const createCompany = (req, res, next) => {
  if (req.method === 'POST') {
    const { name } = req.body
    const cnpj = req.body.cnpj.replace(/[^\d]+/g, '')
    const requestUser = auth.getRequestUserId(req.headers['authorization'])

    const errors = getErrors([{ name: 'nome', value: name, minLength: 4, maxLength: 30 }])
    if (!cnpjValidator.cnpjIsValid(cnpj)) errors.push('O CNPJ é inválido.')

    if (_.some(errors)) return res.status(400).send(errors)

    Company.findOne({ cnpj }, (err, company) => {
      if (err) return errorHandler.handleMongoDBErrors(res, err)

      if (company) return res.status(400).send({ errors: ['O CNPJ já foi cadastrado para outra empresa.'] })

      saveCompany({ name, cnpj, creator: requestUser }, res)
    })
  } else {
    next()
  }
}

module.exports = {
  CompanyModel: Company,
  createCompany
}
