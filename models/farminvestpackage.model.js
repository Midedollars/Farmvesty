// //  require dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating  admin Scheme
const packageSchema = new Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    locationOfFarm: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
        type: Date,  
      required: true,
      trim: true,
      default: Date.now
    },
    amountPerUnit: {
      type: String,
      required: true,
      trim: true,
    },
    totalAmount : {
       type: String,
       required: true,
      trim: true,
    },
    unit : { 
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "unavailable",
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

//    exporting modules
module.exports = mongoose.model("Package", packageSchema);