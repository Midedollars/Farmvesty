const express = require("express");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createPackages,
  viewPackages,
  availablePackages,
  unavailablePackages,
} = require("../controllers/farminvestpackage.controller");

const router = express.Router();

//route for creating or adding new fixtures
router.post("/addpackage",authenticate, authorize, createPackages);


//route for veiwing all fixtures
router.get("/getpackages", authenticate, viewPackages);


router.get("/availablepackages", availablePackages);
router.get("/unavailablepackages", unavailablePackages);

module.exports = router;