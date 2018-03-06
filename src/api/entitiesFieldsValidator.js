module.exports = {
  getErrors: fields => {
    const errors = []

    fields.forEach(field => {
      if (!field.minLength && !field.maxLength) return

      let error = `O campo ${field.name}:`
      if (field.minLength && field.value.length < field.minLength) error += ` Deve ser maior que ${field.minLength}.`
      if (field.maxLength && field.value.length > field.maxLength) error += ` Deve ser menor que ${field.maxLength}.`

      if (error !== `O campo ${field.name}:`) errors.push(error)
    })

    return errors
  }
}
