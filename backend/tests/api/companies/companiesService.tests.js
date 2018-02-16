const request = require('supertest')
const sinon = require('sinon')
const chai = require('chai')
const {expect} = chai
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const server = require('../../../src/infraestructure/server')
require('../../../src/infraestructure/router')(server)
const Company = require('../../../src/api/companies/company')

const Test_Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhODRhZDlmNjBkNDk3MjNjNzhlNDM0YSIsImlhdCI6MTUxODgxODQ2MiwiZXhwIjoxNTE4ODQwMDYyfQ.yUkOPKBDTIaVxTUNlzycJrhRlRBbuco8YKkOxqhpghQ'

describe.only('companiesRequests', () => {
    let createStub
    let findOneStub

    beforeEach(() => {
        createStub = sinon.stub(Company, 'create')
        findOneStub = sinon.stub(Company, 'findOne').callsFake((query, callback) => { callback(null, { name: 'teste ind', cnpj: '82746377000159' }) })
    })

    afterEach(() => {
        createStub.restore()
        findOneStub.restore()
    })

    it('should return an error trying to create a company when some company already registered has the same cnpj', done => {
        request(server)
            .post('/api/companies')
            .set('Authorization', Test_Token)
            .send({
                name: 'Leonardo Habitzreuter',
                cnpj: '82.746.377/0001-59'
            })
            .expect(400)
            .end((err, res) => {
                expect(err).to.be.null
                expect(createStub).to.not.have.been.called
                done()
                expect(res.text).to.eql('{"errors":["O CNPJ já foi cadastrado para outra empresa."]}')
            })
    })
})