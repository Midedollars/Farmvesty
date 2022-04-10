const UserModel = require('../models/user.model')
const {Helpers, ApiError} = require('../utils')
const {
    GenericHelper: { errorResponse, successResponse }
  } = Helpers



class UserController {
    static async createUser(req, res, next) {
        try {
            const user = new UserModel({
                ...req.body,
            })
            const data = await user.save()
            return successResponse(res, {
                message: 'User created successfully'
            })
        } catch (error) {
            next(new ApiError({
                message: error.message,
            }))
        }
    } 
}
