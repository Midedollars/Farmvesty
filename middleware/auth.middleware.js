// require dependencies
const jwt = require("jsonwebtoken");
require("dotenv").config();

//  authenticating  admin
const authenticate = async (req, res, next) => {
  try {
    let authenticationArr = req.headers.authorization.split(" ");
    if (!authenticationArr.includes("Bearer")) {
        return next(new AppError("Bearer is required", 401)); 
    }
    let token = authenticationArr[1];
    if (!token) {
        return next(new AppError("Token is required", 401));
    }
    const decryptToken = await jwt.verify(token, process.env.SECRET_TOKEN, {
      expiresIn: "12h",
    });
    req.user = decryptToken;
    next();
  } catch (error) {
    return errorResMsg(res, 500, "Server Error"); 
  }
};

//  authorizing admin
const authorize = async (req, res, next) => {
  try {
    if (req.user.role == "Admin") {
      next();
    } else {
        return errorResMsg(res, 401, "User does not have access to this resource"); 
    }
  } catch (error) {
    return errorResMsg(res, 500, "Server Error"); r
  }
};

//    exporting modules
module.exports = { authenticate, authorize };