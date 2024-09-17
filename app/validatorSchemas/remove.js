
const Joi = require('joi');
const removeDTO = Joi.object({
    id: Joi.string().guid().required(),
}).not(null);


module.exports = {
    removeDTO
}