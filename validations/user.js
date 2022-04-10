const Joi = require("joi");

const validateRegister = Joi.object({
  firstname: Joi.string().min(3).max(20).required(),
  lastname: Joi.string().min(3).max(20).required(),
  phonenumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const validateLogin = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

// const isblocked = Joi.object({
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   }),
// });

const validateUser = Joi.object({
  id: Joi.number(),
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const UserLogin = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const validatefarminvestpackage = Joi.object({
  packageName: Joi.string().max(20).required(),
  locationOfFarm: Joi.string().max(20).required(),
  duration: Joi.string().max(20).required(),
  amountPerUnit: Joi.string().max(13).required(),
  unit: Joi.string().max(100).required(),
  totalAmount: Joi.string().max(13),
});

// const validPhoneNumber = Joi.object({
//   phoneNumber: Joi.string().min(10).max(13).required(),
// });


module.exports = {
  validateRegister,
  validateLogin,
  // isblocked,
  validateUser,
  UserLogin,
  validatefarminvestpackage
  // validPhoneNumber,
};