/* eslint-disable no-unused-expressions */
const sinon = require('sinon')
const chai = require('chai')
const {expect} = chai
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const { handleNodeRestfulErrors } = require('../../../src/infraestructure/errorHandler')

describe('error handler', () => {
  context('node restful', () => {
    it('should return the errors as json format', () => {
      const jsonMethod = sinon.spy()
      const res = {
        locals: { bundle: { errors: {
          a: { message: 'error1' },
          b: { message: 'error2' },
          c: { message: 'error3' }
        }}},
        status: (statusCode) => ({ json: jsonMethod })
      }

      handleNodeRestfulErrors(null, res, null)

      expect(jsonMethod).to.have.been.calledWithExactly({ errors: ['error1', 'error2', 'error3'] })
    })
  })
})
