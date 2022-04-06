
const Package = require("../models/farminvestpackage.model");

const createPackages = async (req, res, next) => {
  try {
    const { packageName, locationOfFarm, duration, amountPerUnit, TotalAmount, unit } = req.body;

     // validating reg.body with joi
    const result = await validatePackage.validateAsync(req.body)
    return errorResMsg(res, 400, "please fill in the required details");

    let totalAmount = amountPerUnit * unit;

    const createPackages = await Package.create({
      packageName,
      locationOfFarm,
      duration,
      amountPerUnit,
      totalAmount,
      unit,
    });
    return successResMsg(res, 201, {
        message : "Packages created successfully" ,
        createPackages,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error");
  }
};

const viewAllPackages = async (req, res, next) => {
  try {
    const {page, limit} = req.query;
    if (limit === null || page === null) {
      limit = 1;
      page = 1;
    }
    const allPackages = await Package.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ user: -1 })
    .exec();
    const count = await Package.countDocuments();
    return successResMsg(res, 200, {
       viewAllPackages,
      total: allPackages.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    return errorResMsg(res, 401, "Server Error");
  }
};

// const viewPackages = async (req, res, next) => {
//   try {
//     const viewPackage = await Package.find()
//     return successResMsg(res, 200, {
//         viewPackages,
//     });
//   } catch (error) {
//     return errorResMsg(res, 500, "Server Error"); 
//   }
// };


const uploadPackages = async (req, res, next) => {
  try {
    const {packageName, locationOfFarm, duration, amountPerUnit } = req.body;
    const result = await validateAdmin.validateAsync(req.body)
    return errorResMsg(res, 400, "please fill in the required details");

    const uploadPackages = new Package({
      packageName,
      locationOfFarm,
      duration,
      amountPerUnit,
    });
    return successResMsg(res, 201, {
      uploads,
    });
  } catch (error) {
    return errorResMsg(res, 500, "Server Error"); 
  }
};


const availablePackages = async (req, res, next) => {
  try {
    const availablefarmPackages= [];
    const allAvailableFarmPackages = await Package.find().populate("id", {
      _id: 0,
    });
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
    const allUnavailableFarmPackages = await Package.find().populate("id", {
      _id: 0,
    });
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

const updateAPackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPackage = await Package.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPackage) {
      return next(new AppError("Reminder Not Found!", 404));
    }
    return successResMsg(res, 200, {
      message: "Package updated successfully",
      updatedPackage,
    });
  } catch (error) {
    return errorResMsg(res, 401, "Server Error");
  }
};

module.exports = {
  createPackages,
  viewAllPackages,
  uploadPackages,
  availablePackages,
  unavailablePackages,
  updateAPackage
};