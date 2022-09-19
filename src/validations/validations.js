const Joi = require("joi");

const createUserSchema = Joi.object({
  takenaka_id: Joi.number().integer().required(),
  name: Joi.string().required(),
  user_name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}:;"'<>,.?/|\_₹])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      )
    )
    .required(),
  phone: Joi.string(),
  branchId: Joi.array().required(),
  roleId: Joi.number().integer(),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}:;"'<>,.?/|\_₹])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      )
    )
    .required(),
  newPassword: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}:;"'<>,.?/|\_₹])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      )
    )
    .required(),
  confirmPassword: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}:;"'<>,.?/|\_₹])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      )
    )
    .required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  createUserSchema,
  updatePasswordSchema,
  forgetPasswordSchema,
};
