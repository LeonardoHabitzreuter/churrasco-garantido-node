const validate = (email, emailRegex) => {
  return errors => (
    email.match(emailRegex)
      ? errors
      : [ ...errors, 'O e-mail informado está inválido.' ]
  )
}

module.exports = {
  validate
}
