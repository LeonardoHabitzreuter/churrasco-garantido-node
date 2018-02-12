const Order = require('./order')

Order.methods(['get', 'post', 'put'])
Order.updateOptions({new: true, runValidators: true})

module.exports = Order