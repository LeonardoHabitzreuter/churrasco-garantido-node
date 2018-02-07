const server = require('./infraestructure/server')
require('./infraestructure/database')
require('./infraestructure/router')(server)