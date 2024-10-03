
const Joi = require('joi');
const removeDTO = Joi.object({
  user_id: Joi.string().guid().required(),
  id: Joi.string().guid().required(),
}).required().not(null);


module.exports = {
  removeDTO
}
