//  require dependencies
const express = require("express");
const router = express.Router();
const { authenticate} = require("../middleware/auth.middleware");

const { registerUser, 
    verifyEmail,
    loginUser,
    forgetPasswordLink,
    changePassword,
    resetPassword,
    payment,
   } = require("../controllers/user.controller");


   //  creating a route
router.post("/registeruser", registerUser);
router.post("/verifyemail", verifyEmail);
router.post("/loginuser", loginUser);
router.post("/forgetpasswordlink", forgetPasswordLink);
router.post("/forgetpassword", authenticate, changePassword);
router.post("/resetpassword", resetPassword);
router.post("/payment",payment);

//    exporting modules
module.exports = router;