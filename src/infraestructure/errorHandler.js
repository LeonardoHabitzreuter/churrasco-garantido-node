const _ = require('lodash')

const handleNodeRestfulErrors = (req, res, next) => {
  const bundle = res.locals.bundle

  if (!bundle.errors) next()

  const errors = []
  _.forIn(bundle.errors, error => errors.push(error.message))
  res.status(500).json({errors})
}

const handleMongoDBErrors = (res, dbErrors) => {
  const errors = []
  _.forIn(dbErrors.errors, error => errors.push(error.message))
  return res.status(400).json({ errors })
}

module.exports = {
  handleMongoDBErrors,
  handleNodeRestfulErrors
}
