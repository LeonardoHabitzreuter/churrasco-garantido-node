const sinon = require('sinon')
const chai = require('chai')
const {expect} = chai
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const bcrypt = require('bcrypt')

const userService = require('../../../src/api/users/userService')

describe('userService', () => {
    context('user validation', () => {
        it('should call the callback with error when the email is invalid', () => {
            const salt = bcrypt.genSaltSync()
            const passwordHash = bcrypt.hashSync('123456', salt)
            
            const callback = sinon.spy()
            userService.validateUser({ email: 'teste1234', password: '123456', passwordHash, confirmPassword: '123456' }, callback)
            
            expect(callback).to.not.have.been.calledWith(null)
        })
        
        it('should call the callback with error when the password does not have at least 6 characters', () => {
            const salt = bcrypt.genSaltSync()
            const passwordHash = bcrypt.hashSync('1234', salt)

            const callback = sinon.spy()
            userService.validateUser({ email: 'teste1234', password: '1234', passwordHash, confirmPassword: '1234' }, callback)
            
            expect(callback).to.not.have.been.calledWith(null)
        })
        
        it('should call the callback with error when the password have more than 20 characters', () => {
            const salt = bcrypt.genSaltSync()
            const passwordHash = bcrypt.hashSync('123456789123456789123', salt)

            const callback = sinon.spy()
            userService.validateUser({ email: 'teste1234', password: '123456789123456789123', passwordHash, confirmPassword: '123456789123456789123' }, callback)
            
            expect(callback).to.not.have.been.calledWith(null)
        })

        it('should call the callback with no error when all the fields are valid', () => {
            const salt = bcrypt.genSaltSync()
            const passwordHash = bcrypt.hashSync('123456', salt)
            
            const callback = sinon.spy()
            userService.validateUser({ email: 'teste@teste.com', password: '123456', passwordHash, confirmPassword: '123456' }, callback)
            
            expect(callback).to.have.been.calledWith(null)
        })
    })
})