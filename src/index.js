const cluster = require('cluster')
const CPUsAmount = require('os').cpus().length
require('./infraestructure/database')

if (cluster.isMaster) {
  for (let i = 0; i < CPUsAmount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  const server = require('./infraestructure/server')
  require('./infraestructure/router')(server)
}
