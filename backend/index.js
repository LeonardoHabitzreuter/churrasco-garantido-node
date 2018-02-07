const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//import api from './api'

const PORT = process.env.PORT || 3001

express()
  .use('*', cors({ origin: '*' }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  //.use(passport.initialize())
  //.use(passport.session())
  //.use('/', api)
  .post('/api/login', (request, response) => {
      console.log(request)
      return response.json({ token: 'teste' })
  })
  .listen(PORT, () => console.log(`Running! Access http://localhost:${PORT}`))