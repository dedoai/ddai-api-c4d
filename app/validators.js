const Joi = require('joi');
const ApplicationError = require('./ApplicationError');
const { MAX_LIMIT, MAX_OFFSET, DEFAULT_LIMIT, DEFAULT_OFFSET } = require('./constants')


const createDTO = Joi.object({
    consumer_id: Joi.string().guid().required(),
    category_id: Joi.string().guid().required(),
    title: Joi.string().required(),
    description: Joi.string().optional(),
    data_type: Joi.string().required(),
    status: Joi.string().valid('open', 'closed').default('open')
}).not(null)



const updateDTO = Joi.object({
    id: Joi.string().guid().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('open', 'closed').optional(),
    category_id: Joi.string().guid().optional(),
}).not(null);

const deleteDTO = Joi.object({
    id: Joi.string().guid().required(),
}).not(null);

const getDTO = Joi.object({
    id: Joi.string().guid().required(),
    offset: Joi.number().integer().min(0).max(MAX_OFFSET).optional().default(DEFAULT_OFFSET),
    limit: Joi.number().integer().min(1).max(MAX_LIMIT).optional().default(DEFAULT_LIMIT),
    files: Joi.boolean().optional().default(false).when('id', {
        is: Joi.exist(),
        then: Joi.boolean().optional().default(false),
        otherwise: Joi.forbidden()
    }),
    full: Joi.boolean().optional().default(false).when('id', {
        is: Joi.exist(),
        then: Joi.boolean().optional().default(false),
        otherwise: Joi.forbidden()
    })
}).optional().allow(null);


const validateCreateDTO = (dto) => {
    const { error, value } = createDTO.validate(dto);
    if (error) {
        throw new ApplicationError('Invalid input\r\n' + error.details[0].message, 400);
    }
    return value
}

const validateUpdateDTO = (dto) => {
    const { error, value } = updateDTO.validate(dto);
    if (error) {
        throw new ApplicationError('Invalid input\r\n' + error.details[0].message, 400);
    }
    return value
}

const validateRemoveDTO = (dto) => {
    const { error, value } = deleteDTO.validate(dto);
    if (error) {
        throw new ApplicationError('Invalid input\r\n' + error.details[0].message, 400);
    }
    return value
}

const validateGetDTO = (dto) => {
    const { error, value } = getDTO.validate(dto);
    if (error) {
        throw new ApplicationError('Invalid input\r\n' + error.details[0].message, 400);
    }
    return value
}
module.exports = {
    validateCreateDTO,
    validateUpdateDTO,
    validateRemoveDTO,
    validateGetDTO
};