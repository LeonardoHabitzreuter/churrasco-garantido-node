const restful = require('node-restful')
const mongoose = restful.mongoose

const companySchema = new mongoose.Schema({
    name: { type: String, min: 4, max: 30, required: true },
    cnpj: { type: String, min: 14, max: 14, required: true }
})

module.exports = restful.model('Company', companySchema)