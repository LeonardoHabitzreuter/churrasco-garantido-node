const sinon = require('sinon')
const chai = require('chai')
const {expect} = chai
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync()
const Test_Token = require('../../../src/infraestructure/auth').getTestToken()

const User = require('../../../src/api/users/users')
const userService = require('../../../src/api/users/userService')
const request = require('supertest')
const server = require('../../../src/infraestructure/server')
require('../../../src/infraestructure/router')(server)

describe('userService', () => {
    let updateStub
    let userFindOne

    beforeEach(() => {
        updateStub = sinon.stub(User, 'update').callsFake((query, entity, callback) => { callback(null) })
        userFindOne = sinon.stub(User, 'findOne').callsFake((query, callback) => {
            callback(null, {
                id: '1',
                name: 'Leonardo Habitzreuter',
                email: 'leo.habitzreuter@gmail.com',
                password: 'senhaAntiga1234',
                confirmPassword: 'senhaAntiga1234'
            })
        })
    })

    afterEach(() => {
        updateStub.restore()
        userFindOne.restore()
    })
    
    context('user validation', () => {
        let callback

        beforeEach(() => {
            callback = sinon.spy()
        })

        it('should return one error when the email is invalid', () => {
            const passwordHash = bcrypt.hashSync('123456', salt)
            
            const errors = userService.getValidationErrors({ name: 'teste12', email: 'teste1234', password: '123456', passwordHash, confirmPassword: '123456' }, callback)
            
            expect(callback).to.have.been.calledWith(['O e-mail informado está inválido.'])
        })
        
        it('should return one error when the password does not have at least 6 characters', () => {
            const passwordHash = bcrypt.hashSync('1234', salt)

            const errors = userService.getValidationErrors({ name: 'teste12', email: 'teste1234@gmail.com', password: '1234', passwordHash, confirmPassword: '1234' }, callback)
            
            expect(callback).to.have.been.calledWith(['O campo senha: Deve ser maior que 6.'])
        })
        
        it('should return one error when the password have more than 20 characters', () => {
            const passwordHash = bcrypt.hashSync('123456789123456789123', salt)

            const errors = userService.getValidationErrors({
                name: 'teste12',
                email: 'teste1234@gmail.com',
                password: '123456789123456789123',
                passwordHash,
                confirmPassword: '123456789123456789123'
            }, callback)
            
            expect(callback).to.have.been.calledWith(['O campo senha: Deve ser menor que 20.'])
        })

        it('should return no error when all the fields are valid', () => {
            const passwordHash = bcrypt.hashSync('123456', salt)

            const errors = userService.getValidationErrors({
                name: 'teste12',
                email: 'teste@teste.com',
                password: '123456',
                passwordHash,
                confirmPassword: '123456'
            }, callback)
            
            expect(callback).to.have.been.calledWith([])
        })
    })

    context('user requests', () => {
        it('should update the user with a hash of the password receveid from the body', done => {
            request(server)
                .put('/api/users/1')
                .set('Authorization', Test_Token)
                .send({
                    name: 'Leonardo Habitzreuter',
                    email: 'leo.habitzreuter@gmail.com',
                    password: 'teste1234',
                    confirmPassword: 'teste1234'
                })
                .expect(200)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(updateStub).to.have.been.calledOnce
                    expect(updateStub).to.not.have.been.calledWith({ _id: '1' }, { $set: {
                        name: 'Leonardo Habitzreuter',
                        email: 'leo.habitzreuter@gmail.com',
                        password: 'teste1234'
                    }})
                    done()
                })
        })
    })
})