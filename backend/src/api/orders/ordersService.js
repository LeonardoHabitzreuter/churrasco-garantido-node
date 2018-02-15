const Order = require('./order')
const Company = require('../companies/company')
const _ = require('lodash')
const errorHandler = require('../../infraestructure/errorHandler')
const auth = require('../../infraestructure/auth')

Order.methods(['get', 'put'])
Order.updateOptions({new: true, runValidators: true})

const getErrorsFromCreateRequest = ({ company, products }) => {
    const errors = []
    if(!company) errors.push('É obrigatório informar a empresa do pedido.')
    if(!products || !_.some(products)) errors.push('É obrigatório informar ao menos um produto.')
    if(products.some(product => !product.amount || !product.name)) errors.push('É necessário que todos os produtos tenham uma descrição e quantidade maior que 0.')
    return errors
}

const create = async (req, res, next) => {
    if (req.method === 'POST') {
        const { company, products } = req.body
        const requestUser = auth.getRequestUserId(req.headers['authorization'])
        
        const errors = getErrorsFromCreateRequest({ company, products })
        if (_.some(errors)) return res.status(400).send(errors)
        
        const companyFromDB = await Company.findById(company)

        if(!companyFromDB) return res.status(400).send(['A empresa informada deve ser válida.'])

        Order.create({ creator: requestUser, company, products }, (err, order) => {
            if (err) return errorHandler.handleMongoDBErrors(res, err)

            companyFromDB.set({ orders: [ ...companyFromDB.orders, order ] }).save()

            res.status(200).send()
        })
    } else {
        next()
    }
}

module.exports = {
    model: Order,
    create
}