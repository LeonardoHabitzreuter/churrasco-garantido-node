const bcrypt = require('bcryptjs')

const validate = (password, passwordHash) => {
  return errors => (
    bcrypt.compareSync(password, passwordHash)
      ? errors
      : [ ...errors, 'Senhas não conferem.' ]
  )
}

module.exports = {
  validate
}
