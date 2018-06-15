const R = require('ramda')

const composeErrors = R.curry((beginOfError, { condition, message }) => condition ? `${beginOfError} ${message}` : null)

module.exports = {
  getErrors: fields => (
    R.flatten(fields
      .filter(field => field.minLength || field.maxLength)
      .map(field => {
        const validatons = [{
          condition: field.minLength && field.value.length < field.minLength,
          message: `deve ser maior que ${field.minLength}.`
        }, {
          condition: field.maxLength && field.value.length > field.maxLength,
          message: `deve ser menor que ${field.maxLength}.`
        }]

        return validatons.map(composeErrors(`O campo ${field.name}`)).filter(error => error != null)
      }))
  )
}
