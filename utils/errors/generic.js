const ApiError = require('./api.error')
const constants = require('../constants')

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_API,
  AUTH_REQUIRED,
  INVALID_PERMISSION,
  INVALID_CREDENTIALS,
  ACCESS_REVOKED,
  UNAUTHORIZED
} = constants

module.exports = {
  serverError: new ApiError({ message: INTERNAL_SERVER_ERROR, status: 500 }),
  notFoundApi: new ApiError({ message: NOT_FOUND_API, status: 404 }),
  unAuthorized: new ApiError({ message: INVALID_PERMISSION, status: 403 }),
  notAuthorized: new ApiError({ message: UNAUTHORIZED, status: 401 }),
  accessRevoked: new ApiError({ message: ACCESS_REVOKED, status: 403 }),
  inValidLogin: new ApiError({ message: INVALID_CREDENTIALS, status: 401 }),
  conflictSignupError: new ApiError({ message: INVALID_CREDENTIALS, status: 409 }),
  authRequired: new ApiError({ message: AUTH_REQUIRED, status: 401 })
}
