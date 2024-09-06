const Joi = require('joi');
const ApplicationError = require('./ApplicationError');
const createDTO = Joi.object({
    consumerId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    data_type: Joi.string().required(),
    reward: Joi.number().min(0).required(),
    status: Joi.string().valid('open', 'closed').default('open')
}).not(null)



const updateDTO = Joi.object({
    id: Joi.string().uuid().required(),
    title: Joi.string().required(),
    description: Joi.string()
}).not(null);

const deleteDTO = Joi.object({
    id: Joi.string().uuid().required()
}).not(null);

const getDTO = Joi.object({
    id: Joi.string().uuid().optional()
}).optional()


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