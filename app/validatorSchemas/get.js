const Joi = require('joi');
const { MAX_LIMIT, MAX_OFFSET, DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants')
const getDTO = Joi.object({
    id: Joi.string().guid().required(),
    offset: Joi.number().integer().min(0).max(MAX_OFFSET).optional().default(DEFAULT_OFFSET),
    limit: Joi.number().integer().min(1).max(MAX_LIMIT).optional().default(DEFAULT_LIMIT),
    files: Joi.boolean().optional().default(false).when('id', {
        is: Joi.exist(),
        then: Joi.boolean().optional().default(false),
        otherwise: Joi.forbidden()
    }),
    full: Joi.boolean().optional().default(false)
}).optional().allow(null);

module.exports = {
    getDTO
}