const Joi = require('joi');
const schema = Joi.object({
    user_id: Joi.string().guid().required(),
    category_id: Joi.string().guid().required(),
    title: Joi.string().required(),
    description: Joi.string().optional(),
    data_type: Joi.string().required(),
    status: Joi.string().valid('open', 'closed').default('open')
}).required().not(null)

module.exports = {
    schema
}
