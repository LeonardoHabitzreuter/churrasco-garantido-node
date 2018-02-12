const restful = require('node-restful')
const mongoose = restful.mongoose
const User = require('../users/users').user
const Company = require('../companies/company').company

const product = new mongoose.Schema({
    name: { type: String, required: true, min: 2, max: 30 },
    amount: { type: Number, default: 1, required: true }
})

const order = new mongoose.Schema({
    user: User,
    company: Company,
    status: { type: String, default: 'PENDING', uppercase: true, enum: ['PENDING', 'CANCELED', 'FINISHED'] },
    products: [product]
})

module.exports = restful.model('Order', order)