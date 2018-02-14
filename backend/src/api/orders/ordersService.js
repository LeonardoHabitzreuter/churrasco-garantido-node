const Order = require('./order')
const Company = require('../companies/company')
const User = require('../users/users')
const _ = require('lodash')
const errorHandler = require('../../infraestructure/errorHandler')

Order.methods(['get', 'put'])
Order.updateOptions({new: true, runValidators: true})

const getErrorsFromCreateRequest = ({ creator, company, products }) => {
    const errors = []
    if(!creator) errors.push('É obrigatório informar o criador do pedido.')
    if(!company) errors.push('É obrigatório informar a empresa do pedido.')
    if(!products || !_.some(products)) errors.push('É obrigatório informar ao menos um produto.')
    if(products.some(product => !product.amount || !product.name)) errors.push('É necessário que todos os produtos tenham uma descrição e quantidade maior que 0.')
    return errors
}

const getUserAndCompany = async (userId) => {
    return {  }
}

const create = async (req, res, next) => {
    if (req.method === 'POST') {
        const { creator, company, products } = req.body
        
        const errors = getErrorsFromCreateRequest({ creator, company, products })
        if (_.some(errors)) return res.status(400).send(errors)
        
        const user = await User.findById(creator)
        const companyFromDB = await Company.findById(company)

        if(!companyFromDB || !user) return res.status(400).send(['O criador e empresa informados devem ser válidos.'])

        Order.create({ creator, company, products }, (err, order) => {
            if (err) return errorHandler.handleMongoDBErrors(res, err)

            user.set({ orders: [ ...user.orders, order ] }).save()
            companyFromDB.set({ orders: [ ...user.orders, order ] }).save()

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