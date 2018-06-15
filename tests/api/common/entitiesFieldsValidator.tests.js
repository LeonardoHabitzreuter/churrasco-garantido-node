/* eslint-disable no-unused-expressions */
const expect = require('chai').expect

const getErrors = require('../../../src/api/entitiesFieldsValidator').getErrors

describe('entitiesFieldsValidator', () => {
  it('should return an array with one error when the value is smaller than the minLength', () => {
    const errors = getErrors([{ name: 'codigo', value: '123', minLength: 4, maxLength: 8 }])

    expect(errors).to.include('O campo codigo deve ser maior que 4.')
  })

  it('should return an array with two errors when both of fields has errors', () => {
    const errors = getErrors([{
      name: 'code', value: '123', minLength: 4, maxLength: 8
    }, {
      name: 'description', value: '456', minLength: 2, maxLength: 2
    }])

    expect(errors)
      .to.include('O campo code deve ser maior que 4.')
      .and.include('O campo description deve ser menor que 2.')
  })

  it('should return an empty array when the object is valid', () => {
    const errors = getErrors([{ name: 'codigo', value: '123', minLength: 2, maxLength: 8 }])

    expect(errors).to.be.empty
  })
})
