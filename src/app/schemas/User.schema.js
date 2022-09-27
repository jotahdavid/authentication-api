const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
