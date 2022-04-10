const constants = require('../constants')
const ModuleError = require('./module.error')

const { INTERNAL_SERVER_ERROR } = constants


module.exports = class ApiError extends ModuleError {
  
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message || INTERNAL_SERVER_ERROR
    this.status = options.status || 500
  }
}
