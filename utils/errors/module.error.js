const constants = require('../constants')

const { MODULE_ERROR, MODULE_ERROR_STATUS } = constants


module.exports = class ModuleError extends Error {
  
  constructor (options = {}) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = options.message || MODULE_ERROR
    this.status = options.status || MODULE_ERROR_STATUS
    if (options.errors) this.errors = options.errors
  }
}
