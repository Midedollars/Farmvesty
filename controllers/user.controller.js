//  Require dependencies
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendMail } = require("../database/sendMail");
const { successResMsg, errorResMsg } = require("../utils/response");
const AppError = require("../utils/appError");
const {validateUser} = require("../middleware/joiValidate")

//  creating  a user
const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password,} =
      req.body;

    // validating phoneNumber
    const phoneNumberExist = await User.findOne({ phoneNumber });
    if (phoneNumberExist) {
        return errorResMsg(res, 401, "phoneNumber exists, please login");
    }

    // validating email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
     return errorResMsg(res, 401, "email exists, please login"); 
    }

    const result = await validateUser.validateAsync(req.body)
    return errorResMsg(res, 400, "please fill in the required details");

    //  hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    // creating a new user
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = await jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "12h",
    });
     let mailOptions = {
       to: newUser.email,
       subject: "Verify Mail",
       text: "pls verify your email address",
     };
     await sendMail(mailOptions);
     return successResMsg(res, 201, {
       newUser,
     });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error");
  }
};

// logging in a user
const loginUser = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const phoneNumberExist = await User.findOne({ phoneNumber });
    if (!phoneNumberExist) {
        return next(new AppError("phoneNumber does not exist,please create an account", 401));
    }
    let isPasswordExist = await bcrypt.compare(
      password,
      phoneNumberExist.password
    );
    if (!isPasswordExist) {
        return next(new AppError("password not correct", 401));
    }
    if (phoneNumberExist.blocked == true) {
        return next(new AppError("Your account has been suspended, please contact customer care", 403));
    }
    const data = {
      id: phoneNumberExist._id,
      phoneNumber: phoneNumberExist.phoneNumber,
      role: phoneNumberExist.role,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "12h",
    });
    return successResMsg(res, 200, {
        message: "User login successfully",
        token,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error"); 
  }
};
//   exporting modules
module.exports = { registerUser, loginUser};