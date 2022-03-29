const express = require("express");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createPackages,
  viewAllPackages,
  availablePackages,
  unavailablePackages,
  updateAPackage,
} = require("../controllers/farminvestpackage.controller");

const router = express.Router();

//route for creating or adding new farm investments
router.post("/addpackage",authenticate, authorize, createPackages);


//route for veiwing all available farm investments
router.get("/getpackages", authenticate, viewAllPackages);


router.get("/availablepackages", availablePackages);
router.get("/unavailablepackages", unavailablePackages);
router.get("/updatedPackage", updateAPackage);

module.exports = router;