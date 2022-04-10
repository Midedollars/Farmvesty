const constants = require('../constants')
const ModuleError = require('./module.error')

const { DB_ERROR, DB_ERROR_STATUS } = constants


module.exports = class DBError extends ModuleError {
  
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message || DB_ERROR
    this.status = options.status || DB_ERROR_STATUS
  }
}
