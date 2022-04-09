//  Require dependencies
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendMail } = require("../database/sendMail");
const { successResMsg, errorResMsg } = require("../utils/response");
const AppError = require("../utils/appError");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/joiValidate.middleware");
const db = require("../database/connectmysql.database");


//  creating  Admin
const registerAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password} = req.body;
    
    // // validating phoneNumber
    // const phoneNumberExist = await Admin.findOne({ phoneNumber });
    // if (phoneNumberExist) {
    //     return errorResMsg(res, 401, "phoneNumber exists, please login"); 
    // }
    // // validating email
    // const emailExist = await Admin.findOne({ email });
    // if (emailExist) {
    //     return errorResMsg(res, 401, "email exists, please login"); 
    // }

    //  validating reg.body with joi
    const registerAdmin = await validateRegister.validateAsync(req.body);
    const [row] = await db.execute(
      "SELECT `email` FROM `users` WHERE `email` = ?",
      [req.body.email]
    );

    if (row.length > 0) {
      return res.status(400).json({
        message: "the email already exist",
      });
    }
    console.log(row);
    // const result = await validateRegister.validateAsync(req.body)
    // return errorResMsg(res, 400, "please fill in the required details");


    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // create  a new Admin
    const [newAdmin] = await db.execute(
      "INSERT INTO admin (firstName, lastName, phoneNumber, email, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, phoneNumber, email, hashPassword]
    );

    // const newAdmin = await Admin.create({
    //   firstName,
    //   lastName,
    //   phoneNumber,
    //   email,
    //   password: hashPassword,
    // });
    const payload = {
      id: row[0],
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      Password: req.body.hashPassword,
      role: req.body.role,
      isVerified: req.body.isVerified,
    };
    // const url = "theolamideolanrewaju.com";
    const token = await jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "12h",
    });

     //  verifying email address with nodemailer
    let mailOptions = {
      to: newAdmin.email,
      subject: "Verify Mail",
      text: `Hi ${firstName}, Pls verify your email.
      ${token}`,
    };
    await sendMail(mailOptions);
    return successResMsg(res, 201, {
      message: "Admin created",
      newAdmin,
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
};

// verifying Email
const verifyAdminEmail = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decodedToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    const admin = await db.execute("SELECT * FROM admin WHERE email = ?", [
      {
        email: decodedToken.email,
      },
    ]);
    if (admin.verified) {
      return successResMsg(res, 200, {
        message: "Admin verified already",
      });
    }
    
    const verify = await db.execute(
      "UPDATE admin SET isVerified = true WHERE isVerified = false"
    );
    return successResMsg(res, 201, { message: "Admin verified successfully" });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
//     admin.isVerified = true;          
//     admin.save();
//     return successResMsg(res, 201, { message: "Admin verified successfully" });
//   } catch (error) {
//     return errorResMsg(res, 500, { message: error.message });
//   }
// };


//  login for Admin
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // joi validation
    if (email && password) {
      const [row] = await db.execute("SELECT * FROM admin WHERE email =?", [
        email,
      ]);
    
      emailexist = [row];
      console.log(emailexist);
      
      if (row.length === 0) {
        return res.status(400).json({
          message: "email address not found.",
        });
      }
      // console.log("here");
      const passMatch = await bcrypt.compareSync(password, row[0].password);
      if (!passMatch) {
        return res.status(400).json({ message: "incorrect paaword" });
      }
      if (row[0].isVerified === 0) {
        return res.status(400).json({
          message: "Unverified account.",
        });
      }
    }
    const validLogin = await validateLogin.validateAsync(req.body);

    // const phoneNumberExist = await db.query(
    //   "SELECT * FROM admin WHERE admin.phoneNumber = phoneNumber"
    // );
    // if (!phoneNumberExist) {
    //   return next(
    //     new AppError("PhoneNumber does not exist, please create an account", 401)
    //   );
    // }
    //  console.log("you");
    // const isPasswordExist = await bcrypt.compare(
    //   password =
    //   phoneNumberExist.password
    // );
    // if (!isPasswordExist) {
    //   return next(new AppError(" Password is not correct", 400));
    // }
   
    // if (!emailExist.role == "Admin") {
    //   return next(new AppError("Unauthorized", 401));
    // }
    // if (!emailExist.isVerified) {
    //   return res.status(401).json({ message: "Admin not verified" });
    // }
    // const phoneNumberExist = await Admin.findOne({ phoneNumber });
    // if (!phoneNumberExist) {
    //     return next(new AppError("phoneNumber does not exist,please create an account", 401));
    // }
    // let isPasswordExist = await bcrypt.compare(
    //   password,
    //   phoneNumberExist.password
    // );
    // if (!isPasswordExist) {
    //     return next(new AppError("password not correct", 401)); 
    // }
    // if (phoneNumberExist.role == "User") {
    //     return next(new AppError("Unauthorized", 401)); 
    // }
    const data = {
      email: emailexist[0][0].email,
      phoneNumber: emailexist[0][0].phoneNumber,
      role: emailexist[0][0].role,
    };
    console.log(emailexist[0][0].role);

    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "12h",
    });
    return successResMsg(res, 200, {
        message: "Admin login successfully",
        token,
    });
  } catch (error) {
    return errorResMsg(res, 500, error.message); 
  }
};

//   exporting modules
module.exports = { registerAdmin, verifyAdminEmail,loginAdmin };