const Company = require('./company')
const errorHandler = require('../../infraestructure/errorHandler')
const _ = require('lodash')
const cnpjValidator = require('../cnpjValidator')
const getErrors = require('../entitiesFieldsValidator').getErrors

Company.methods(['get'])
Company.updateOptions({new: true, runValidators: true})
Company.after('put', errorHandler.handleNodeRestfulErrors)

const saveCompany = ({ name, cnpj }, res) => {
    Company.create({ name, cnpj }, saveErr => {
        if (saveErr) return errorHandler.handleMongoDBErrors(res, saveErr)

        res.status(200).send()
    })
}

const createCompany = (req, res, next) => {
    if (req.method === 'POST') {
        const { name, cnpj } = req.body
        
        const errors = getErrors([{ name: 'nome', value: name, minLength: 4, maxLength: 30 }])
        if(!cnpjValidator.cnpjIsValid(cnpj.replace(/[^\d]+/g,''))) errors.push('O CNPJ é inválido.')

        if (_.some(errors)) return res.status(400).send(errors)
        
        Company.findOne({ cnpj }, (err, company) => {
            if (err) return errorHandler.handleMongoDBErrors(res, err)
    
            if (company) return res.status(400).send({ errors: ['O CNPJ já foi cadastrado para outra empresa.'] })

            saveCompany({ name, cnpj }, res)
        })
    } else {
        next()
    }
}

module.exports = {
    CompanyModel: Company,
    createCompany
}