
const Package = require("../models/farminvestpackage.model");

const createPackages = async (req, res, next) => {
  try {
    const { packageName, locationOfFarm, duration, amountPerUnit } = req.body;
    const result = await validatePackage.validateAsync(req.body)
    return errorResMsg(res, 400, "please fill in the required details");

    const createPackages = await Package.create({
      packageName,
      locationOfFarm,
      duration,
      amountPerUnit,
    });
    return successResMsg(res, 201, {
        message : "Packages created successfully" ,
        createPackages,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error");
  }
};


const viewPackages = async (req, res, next) => {
  try {
    const viewPackage = await Package.find()
    return successResMsg(res, 200, {
        viewPackages,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error"); 
  }
};

const availablePackages = async (req, res, next) => {
  try {
    const availablefarmPackages= [];
    const allAvailableFarmPackages = await Package.find()
    console.log(allAvailableFarmPackages)
    for (allAvailableFarmPackage of allAvailableFarmPackages) {
      if (allAvailableFarmPackage.status === "available") {
        availableFarmPackages.push(allAvailableFarmPackage);
      }
    }
    return successResMsg(res, 200, {
        availablePackages,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error");
  }
};

const unavailablePackages = async (req, res, next) => {
  try {
    const unavailableFarmPackages= [];
    const allUnavailableFarmPackages = await Package.find()
    for (unavailableFarmPackage of allUnavailableFarmPackages) {
      if (unavailableFarmPackage.status === "unavailable") {
        unavailableFarmPackages.push(unavailableFarmPackage);
      }
    }
    return successResMsg(res, 200, {
        unavailablePackages,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error");
  }
};

module.exports = {
  createPackages,
  viewPackages,
  availablePackages,
  unavailablePackages
};