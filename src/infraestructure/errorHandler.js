const R = require('ramda')

const getInnerErrors = R.pipe(
  R.prop('errors'),
  R.map(x => x.message),
  R.values
)

const handleNodeRestfulErrors = (req, res, next) => {
  const bundle = res.locals.bundle

  if (!bundle.errors) next()

  const errors = getInnerErrors(bundle)
  res.status(500).json({errors})
}

const handleMongoDBErrors = (res, dbErrors) => {
  const errors = getInnerErrors(dbErrors)
  return res.status(400).json({ errors })
}

module.exports = {
  handleMongoDBErrors,
  handleNodeRestfulErrors
}
