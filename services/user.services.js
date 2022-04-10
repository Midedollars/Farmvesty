const {fetchUserByEmail} = require('../database/mysql/queries/user')
const db = require("../database/mysql")

class UserService {
    static getUserByEmail (email) {
        return db.execute(fetchUserByEmail, [email])
    }
}


module.exports = UserService