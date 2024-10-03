const Joi = require('joi');
const { MAX_LIMIT, MAX_OFFSET, DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../../constants')
const schema = Joi.object({
    user_id: Joi.string().guid().required(),
    id: Joi.string().guid().optional(),
    offset: Joi.number().integer().min(0).max(MAX_OFFSET).optional().default(DEFAULT_OFFSET),
    limit: Joi.number().integer().min(1).max(MAX_LIMIT).optional().default(DEFAULT_LIMIT)
}).optional().allow(null);

module.exports = {
    schema
}
