/* eslint-disable no-unused-expressions */
const expect = require('chai').expect

const cnpjIsValid = require('../../../src/api/cnpjValidator').cnpjIsValid

describe('cnpjValidator', () => {
  it('should return false when cnpj is an invalid string', () => {
    expect(cnpjIsValid(null)).be.false
    expect(cnpjIsValid('')).be.false
  })

  it('should return false when cnpj length is different than 14', () => {
    expect(cnpjIsValid('123456789123456')).be.false
    expect(cnpjIsValid('1234567891234')).be.false
  })

  it('should return false when all cnpj characters is equal', () => {
    expect(cnpjIsValid('11111111111111')).be.false
  })
})
