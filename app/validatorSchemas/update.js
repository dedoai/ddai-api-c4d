const Joi = require('joi');
const updateDTO = Joi.object({
    id: Joi.string().guid().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('open', 'closed').optional(),
    category_id: Joi.string().guid().optional(),
}).not(null);
module.exports = {
    updateDTO
}