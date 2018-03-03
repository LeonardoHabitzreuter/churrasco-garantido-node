const expect = require('chai').expect

const getErrors = require('../../../src/api/entitiesFieldsValidator').getErrors

describe('entitiesFieldsValidator', () => {
    it('should return an array with one error when the value is smaller than the minLength', () => {
        const errors = getErrors([{ name: 'codigo', value: '123', minLength: 4, maxLength: 8 }])

        expect(errors).to.include('O campo codigo: Deve ser maior que 4.')
    })

    it('should return an empty array when the object is valid', () => {
        const errors = getErrors([{ name: 'codigo', value: '123', minLength: 2, maxLength: 8 }])
        
        expect(errors).to.be.not.empty
    })
})