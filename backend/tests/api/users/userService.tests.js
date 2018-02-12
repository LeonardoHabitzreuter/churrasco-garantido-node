const sinon = require('sinon')
const chai = require('chai')
const {expect} = chai
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync()

const User = require('../../../src/api/users/users')
const userService = require('../../../src/api/users/userService')

describe('userService', () => {
    let findOneStub

    beforeEach(() => {
        findOneStub = sinon.stub(User, 'findOne').callsFake((query, callback) => { callback(null, null) })
    })

    afterEach(() => {
        findOneStub.restore()
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

    context.skip('user requests', () => {
        const request = require('supertest')
        const server = require('../../../src/infraestructure/server')
        require('../../../src/infraestructure/router')(server)
        
        let updateStub = sinon.stub(User, 'update')

        it('should update the user with a hash of the password receveid from the body', () => {
            const passwordHash = bcrypt.hashSync('teste1234', salt)

            request(server)
                .put('/users/1')
                .send({
                    name: 'Leonardo Habitzreuter',
                    email: 'leo.habitzreuter@gmail.com',
                    password: 'teste1234',
                    confirmPassword: 'teste1234'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) throw err

                    expect(updateStub).to.have.been.calledWith({ _id: '1' }, { $set: {
                        name: 'Leonardo Habitzreuter',
                        email: 'leo.habitzreuter@gmail.com',
                        password: passwordHash
                    }})
                })
            
            updateStub.restore()
        })
    })
})