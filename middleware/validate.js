const { Helpers, ApiError } = require('../utils')

const {
  GenericHelper: { errorResponse, validateInput }
} = Helpers

class ValidationMiddleware {
 
  static validate (schema) {
    return async (req, res, next) => {
      try {
        await validateInput(schema, req.body)
        next()
      } catch (error) {
        const apiError = new ApiError({
          status: 400,
          message: error.details[0].message
        })
        errorResponse(req, res, apiError)
      }
    }
  }
}

module.exports = ValidationMiddleware
