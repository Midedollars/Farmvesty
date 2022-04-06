class User {
  constructor() {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isVerified = isVerified;
    // this.username = username;
    // this.googleId = googleId;
    // this.thumbnail = thumbnail;
  }
}

// module.exports = User;//  require dependencies
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // creating  user Scheme
// const userSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       // required: true,
//       trim: true,
//     },
//     lastName: {
//       type: String,
//       // required: true,
//       trim: true,
//     },
//     phoneNumber: {
//       type: String,
//       // required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       // required: true,
//       trim: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please fill a valid email address",
//       ],
//     },
//     password: {
//       type: String,
//       // required: true,
//       trim: true,
//     },
//     role: {
//       type: String,
//       enum: ["User", "Admin"],
//       default: "User",
//     },
//     username: {
//        type: String,
//       },
//     googleId: {
//       type : String,
//     },
//   thumbnail: {
//     type : String,
//   },
//   },
//   {
//     timestamps: true,
//   }
// );

// //    exporting userSchema to model;
// module.exports = mongoose.model("User", userSchema);