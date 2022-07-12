import joi from "joi"

export const logInSchema = joi.object({
    id: joi.number().integer().required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
});

export const createCardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});

export const activationSchema = joi.object({
    id: joi.number().integer().required(),
    securityCode: joi.string().pattern(/^[0-9]{3}$/).required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
});

export const rechargeSchema = joi.object({
    id: joi.number().required(),
    amount: joi.number().integer().min(1).required()
  });
  
  export const paymentSchema = joi.object({
      id: joi.number().integer().required(),
      password: joi.string().pattern(/^[0-9]{4}$/).required(),
      businessId: joi.number().integer().required(),
      amount: joi.number().integer().min(1).required()
  });