//  require dependencies
const express = require("express");
const router = express.Router();
const { registerUser, 
    verifyEmail,
    loginUser,
    // forgetPasswordLink,
    // changePassword,
    // resetPassword,
    payment,
   } = require("../controllers/user.controller");


   //  creating a route
router.post("/registeruser", registerUser);
router.post("/verifyemail", verifyEmail);
router.post("/loginUser", loginUser);
router.post("/payment",payment);
// router.post("/forgetpasswordlink", forgetPasswordLink);
// router.post("/ forgetpassword", changePassword);
// router.post("/resetpassword", resetPassword);

//    exporting modules
module.exports = router;