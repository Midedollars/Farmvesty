const joi = require('joi')


const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    // role: joi.string().required(), 
})

const adminSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    // role: joi.string().required(), 
})


const packageSchema = joi.object({
    packageName: joi.string().required(),
    locationOfFarm: joi.string().required(),
    duration: joi.date().required(),
    amountPerUnit: joi.string().required(),
    // status: joi.string().required(), 
})
    





