import joi from "joi";
export var logInSchema = joi.object({
    id: joi.number().integer().required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
});
export var createCardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});
export var activationSchema = joi.object({
    id: joi.number().integer().required(),
    securityCode: joi.string().pattern(/^[0-9]{3}$/).required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
});
export var rechargeSchema = joi.object({
    id: joi.number().required(),
    amount: joi.number().integer().min(1).required()
});
export var paymentSchema = joi.object({
    id: joi.number().integer().required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required(),
    businessId: joi.number().integer().required(),
    amount: joi.number().integer().min(1).required()
});
