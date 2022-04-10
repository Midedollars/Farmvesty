const constants = require('../constants')
const DBError = require('../errors/db.error')
const genericError = require('../errors/generic')

const { serverError } = genericError
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants


class GenericHelper {
 
  static async validateInput (schema, object) {
    return schema.validateAsync(object)
  }

  
  static getIpAddress (req) {
    return req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress
  }


  static successResponse (
    res,
    { data, message = SUCCESS_RESPONSE, code = 200 }
  ) {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data
    })
  }

  
  static errorResponse (req, res, error) {
    const aggregateError = { ...serverError, ...error }
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors
    })
  }
}

module.exports = GenericHelper
