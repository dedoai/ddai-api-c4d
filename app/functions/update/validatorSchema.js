const Joi = require('joi');
const schema = Joi.object({
    user_id: Joi.string().guid().required(),
    id: Joi.string().guid().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('open', 'closed').optional(),
    category_id: Joi.string().guid().optional(),
}).required().not(null);
module.exports = {
    schema
}
