//  Require dependencies
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendMail } = require("../database/sendMail");
const { successResMsg, errorResMsg } = require("../utils/response");
const AppError = require("../utils/appError");
const {validateAdmin} = require("../middleware/joiValidate")

//  creating  Admin
const registerAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password} = req.body;
    
    // validating phoneNumber
    const phoneNumberExist = await Admin.findOne({ phoneNumber });
    if (phoneNumberExist) {
        return errorResMsg(res, 401, "phoneNumber exists, please login"); 
    }
    // validating email
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
        return errorResMsg(res, 401, "email exists, please login"); 
    }
    const result = await validateAdmin.validateAsync(req.body)
    return errorResMsg(res, 400, "please fill in the required details");

    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // create  a new Admin
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    const payload = {
      id: newAdmin._id,
      email: newAdmin.email,
      role: newAdmin.role,
    };
    const token = await jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "12h",
    });
    let mailOptions = {
      to: newAdmin.email,
      subject: "Verify Mail",
      text: "pls verify your email address",
    };
    await sendMail(mailOptions);
    return successResMsg(res, 201, {
      newAdmin,
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error");
  }
};

//  login for Admin
const loginAdmin = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const phoneNumberExist = await Admin.findOne({ phoneNumber });
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
    if (phoneNumberExist.role == "User") {
        return next(new AppError("Unauthorized", 401)); 
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
        message: "Admin login successfully",
        token,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error"); 
  }
};

//   exporting modules
module.exports = { registerAdmin, loginAdmin };