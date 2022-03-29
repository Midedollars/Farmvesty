//  require dependencies
const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  verifyEmail,
  loginAdmin,
} = require("../controllers/admin.controller");

//  creating a route
router.post("/registeradmin", registerAdmin);
router.post("/verifyemail", verifyEmail);
router.post("/loginadmin", loginAdmin);

//    exporting modules
module.exports = router;