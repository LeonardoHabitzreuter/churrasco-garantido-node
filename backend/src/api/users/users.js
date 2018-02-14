const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, min: 6, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
})

module.exports = restful.model('User', userSchema)