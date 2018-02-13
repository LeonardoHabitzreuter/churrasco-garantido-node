const restful = require('node-restful')
const mongoose = restful.mongoose

const product = new mongoose.Schema({
    name: { type: String, required: true, min: 2, max: 30 },
    amount: { type: Number, default: 1, required: true }
})

const order = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    status: { type: String, default: 'PENDING', uppercase: true, enum: ['PENDING', 'CANCELED', 'FINISHED'] },
    products: [product]
})

module.exports = restful.model('Order', order)