/* eslint-disable no-unused-expressions */
const request = require('supertest')
const sinon = require('sinon')
const chai = require('chai')
const {expect} = chai
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const testToken = require('../../../src/infraestructure/auth').getTestToken()

const server = require('../../../src/infraestructure/server')
require('../../../src/infraestructure/router')(server)
const Order = require('../../../src/api/orders/order')

describe('ordersRequests', () => {
  let createStub

  beforeEach(() => {
    createStub = sinon.stub(Order, 'create')
  })

  afterEach(() => {
    createStub.restore()
  })

  it('should return an error trying to create an order with invalid request', done => {
    request(server)
      .post('/api/orders')
      .set('Authorization', testToken)
      .send({
        someProp: 'come value'
      })
      .expect(400)
      .end((err, res) => {
        expect(err).to.be.null
        expect(createStub).to.not.have.been.called
        const responseObject = JSON.parse(res.text)
        expect(responseObject).to.include('É obrigatório informar a empresa do pedido.')
        done()
      })
  })
})
