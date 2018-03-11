require('./infraestructure/database')
const server = require('./infraestructure/server')
require('./infraestructure/router')(server)
