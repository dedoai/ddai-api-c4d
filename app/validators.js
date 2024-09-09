const Joi = require('joi');
const ApplicationError = require('./ApplicationError');
const createDTO = Joi.object({
    consumer_id: Joi.number().min(1).required(),
    category_id: Joi.number().min(1).required(),
    title: Joi.string().required(),
    description: Joi.string(),
    data_type: Joi.string().required(),
    reward: Joi.number().min(0).required(),
    status: Joi.string().valid('open', 'closed').default('open'),
    files: Joi.array().items(Joi.object({
        file_name: Joi.string().required(),
        file_type: Joi.string().required(),
        bucket_url: Joi.string().required()
    })).optional().allow(null)
}).not(null)



const updateDTO = Joi.object({
    id: Joi.number().min(1).required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('open', 'closed').optional(),
    category_id: Joi.number().min(1).optional(),
}).not(null);

const deleteDTO = Joi.object({
    id: Joi.number().min(1).required()
}).not(null);

const getDTO = Joi.object({
    id: Joi.number().min(1).optional(),
    offset: Joi.number().min(0).optional().default(0),
    limit: Joi.number().min(1).optional().default(20)
}).optional().allow(null)

const getFilesDTO = Joi.object({
    id: Joi.number().min(1).required(),
    files: Joi.string().required().valid('files').default('files'),
    offset: Joi.number().min(0).optional().default(0),
    limit: Joi.number().min(1).optional().default(20)
}).optional().allow(null)


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

const validateGetFilesDTO = (dto) => {
    const { error, value } = getFilesDTO.validate(dto);
    if (error) {
        throw new ApplicationError('Invalid input\r\n' + error.details[0].message, 400);
    }
    return value
}
module.exports = {
    validateCreateDTO,
    validateUpdateDTO,
    validateRemoveDTO,
    validateGetDTO,
    validateGetFilesDTO
};