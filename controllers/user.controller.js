//  Require dependencies
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendMail } = require("../database/sendMail");
const axios = require("axios");
const { successResMsg, errorResMsg } = require("../utils/response");
const AppError = require("../utils/appError");
const {
  validateUser,
  UserLogin,
  // validPhoneNumber,
} = require("../middleware/joiValidate.middleware");
const db = require("../database/connectmysql.database")

//  creating  a user
const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password,} =
      req.body;

    // // validating phoneNumber
    // const phoneNumberExist = await User.findOne({ phoneNumber });
    // if (phoneNumberExist) {
    //     return errorResMsg(res, 401, "phoneNumber exists, please login");
    // }

    // // validating email
    // const emailExist = await User.findOne({ email });
    // if (emailExist) {
    //  return errorResMsg(res, 401, "email exists, please login"); 
    // }

    // const result = await validateUser.validateAsync(req.body)
    // return errorResMsg(res, 400, "please fill in the required details");


   // validating req.body with joi
   const registerUser = await validateUser.validateAsync(req.body);
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
  
    //  hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    // creating a new user
    const [newUser] = await db.execute(
      "INSERT INTO users (firstName, lastName,  phoneNumber, email, password) VALUES ( ?, ?, ?, ?, ?)",
      [firstName, lastName, phoneNumber,email, hashPassword]
    );
// const newUser = await User.create({
//       firstName,
//       lastName,
//       phoneNumber,
//       email,
//       password: hashPassword,
//     });
    const payload = {
      id: row[0],
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
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
       to: newUser.email,
       subject: "Verify Email",
       text: `Hi ${firstName}, Pls verify your email.
       ${token}`,
     };
     await sendMail(mailOptions);
     return successResMsg(res, 201, {
       message: "User created",
       newUser,
       token,
     });
  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
};


// verifying Email
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decodedToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    // const user = await User.findOne({ email: decodedToken.email }).select(
    //   "isVerified"
    // );


    const user = await db.execute("SELECT * FROM users WHERE email = ?", [
      {
        email: decodedToken.email,
    },
  ]);
    // const founduser = users[0].find((user) => user.email === email);
    // if (founduser) {
    //   return successResMsg(res, 200, {
    //     message: "user verified already",
    //   });
    // }
    if (user.isVerified) {
      return successResMsg(res, 200, {
        message: "user verified already",
      });
    }
    // user.isVerified = true;
    // user.save();

    const verify = await db.execute(
      "UPDATE users SET isVerified = true WHERE isVerified = false",
    );
    return successResMsg(res, 201, { message: "User verified successfully" });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

// logging in a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
       // validate with joi
        // validate with joi
    if (email && password) {
      const [row] = await db.execute("SELECT * FROM users WHERE email =?", [
        email,
      ]);
      if (row.length === 0) {
        return res.status(400).json({
          message: "email address not found.",
        });
      }
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
       const loginUser = await UserLogin.validateAsync(req.body);
  
      //  const phoneNumberExist = await db.execute(
      //    "SELECT phoneNumber FROM users WHERE phoneNumber = password");
      //  if (!phoneNumberExist) {
      //    return next(
      //      new AppError("PhoneNumber does not exist, please create an account", 401)
      //    );
      //  }
       
      //  if (phoneNumberExist.password) {
      //    return next(new AppError("User not Verified", 401));
      //  }
    // const phoneNumberExist = await User.findOne({ phoneNumber });
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
    // if (!emailExist.isVerified) {
    //   return next(new AppError("User not Verified", 401));
    // }

    // if (phoneNumberExist.blocked == true) {
    //     return next(new AppError("Your account has been suspended, please contact customer care", 403));
    // }
    const data = {
      email: email.email,
      phoneNumber: email.phoneNumber,
      role: email.role,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "12h",
    });
    return successResMsg(res, 200, {
        message: "User login successfully",
        token,
    });
  } catch (error) {
    return errorResMsg(res, 500, error.message); 
  }
};

const forgetPasswordLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [row] = await db.execute("SELECT * FROM users WHERE email =?", [
      email,
    ]);
    if (row.length === 0) {
      return res.status(400).json({
        message: "email address not found.",
      });
    }
    // console.log(row);
    const data = {
      phone: row[0].phoneNumber,
      email: row[0].email,
      role: row[0].role,
    };
    // console.log
    // getting a secret token
    const secret_key = process.env.SECRET_TOKEN;
    const token = await jwt.sign(data, secret_key, { expiresIn: "1hr" });
    const detoken = await jwt.verify(token, secret_key);
    console.log(detoken);
    let mailOptions = {
      to: email.email,
      subject: "Reset Password",
      text: `Hi ${email.firstName}, Reset your password with the link below.${token}`,
    };
    await sendMail(mailOptions);
    return successResMsg(res, 200, {
      message: `Hi ${row[0].firstName},reset password.`,
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email, token } = req.query;
    const secret_key = process.env.SECRET_TOKEN;
    const decoded_token = await jwt.verify(token, secret_key);
    console.log(email);
    console.log(decoded_token);
    if (decoded_token.email !== email) {
      return next(new AppError("Email do not match.", 404));
    }
    if (newPassword !== confirmPassword) {
      return next(new AppError("Password do not match.", 404));
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    const updatedPassword = await db.execute(
      "UPDATE users SET isVerified = true WHERE isVerified = true"
    );
    return successResMsg(res, 200, {
      message: "Password has been updated successfully",
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { email } = req.query;
    const loggedUser = await db.execute("SELECT * FROM users WHERE email =?", [
      email,
    ]);
    // const headerTokenEmail = await jwt.verify(
    //   req.headers.authorization.split(" ")[1],
    //   process.env.SECRET_TOKEN
    // ).email;
    // console.log(headerTokenEmail);
    // console.log(loggedUser[0][0].email);
    // if (headerTokenEmail !== loggedUser[0][0].email) {
    //   return next(new AppError("Forbidden", 404));
    // }
    // console.log(typeof loggedUser[0][0].password);
    // console.log(typeof oldPassword);
    // console.log(await bcrypt.compare(oldPassword, loggedUser[0][0].password));
    // console.log(await bcrypt.compare(loggedUser[0][0].password, oldPassword));
    // console.log(loggedUser[0][0].password);
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      loggedUser[0][0].password
    );
    // console.log(oldPassword);
    // console.log("//////////////////////////////////////")
    if (!passwordMatch) {
      return next(new AppError("old Password is not correct.", 404));
    }

    if (newPassword !== confirmPassword) {
      return next(new AppError("Password do not match.", 400));
    }

    const hashPassword = await bcrypt.hash(confirmPassword, 10);

    const resetPassword = await db.execute(
      "SELECT * FROM users WHERE email =?",
      [email],
      [{ password: hashPassword }]
    );
    return successResMsg(res, 200, {
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};


const payment = async (req, res, next) => {
  try {
    const data = await axios({
      method: "post",
      url: "https://api.flutterwave.com/v3/payments",
      headers: {
        Authorization: `Bearer ${process.env.FLUT_SEC_KEY}`,
      },
      data: {
        tx_ref: "hooli-tx-1920bbtytty",
        amount: "100",
        currency: "NGN",
        redirect_url:
          "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
        customer: {
          email: "ojojoshuat@gmail.com",
          phonenumber: "0812344528",
          name: "Yemi Desola",
        },
      },
    });
    console.log("data:", data.data);
   
    return res.status(200).json(
       data.data
    )
    }
  catch (error) {
    console.log(error);
  }
};

//   exporting modules
module.exports = { 
  registerUser, 
  verifyEmail,
  loginUser,
  forgetPasswordLink,
  changePassword,
  resetPassword,
  payment,
};