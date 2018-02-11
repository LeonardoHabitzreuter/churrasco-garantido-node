const request = require('supertest')
const sinon = require('sinon')
const chai = require('chai')
const {expect} = chai
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const server = require('../../../src/infraestructure/server')
require('../../../src/infraestructure/router')(server)
const Company = require('../../../src/api/companies/company')

describe('companiesRequests', () => {
    let createStub = sinon.stub(Company, 'create')
    let findOneStub = sinon.stub(Company, 'findOne').callsFake((query, callback) => { callback(null, { name: 'teste ind', cnpj: '82746377000159' }) })

    it('should return an error trying to create a company when some company already registered has the same cnpj', () => {
        request(server)
            .post('/companies')
            .send({
                name: 'Leonardo Habitzreuter',
                cnpj: '82.746.377/0001-59'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) throw err
            })

        expect(createStub).to.not.have.been.called
        createStub.restore()
        findOneStub.restore()
    })
})