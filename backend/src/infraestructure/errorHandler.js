const _ = require('lodash')

const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors 
}

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle

    if(!bundle.errors) next()

    const errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
}