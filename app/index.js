const { create } = require('./functions/create')
const { get } = require('./functions/get')
const { remove } = require('./functions/remove')
const { update } = require('./functions/update')
const { responseDTO } = require('./utils')
const ApplicationError = require('./ApplicationError')
const { validate } = require('./validator')
const { createDTO } = require('./validatorSchemas/create')
const { updateDTO } = require('./validatorSchemas/update')
const { getDTO } = require('./validatorSchemas/get')
const { removeDTO } = require('./validatorSchemas/remove')
exports.handler = async (event) => {

    const { httpMethod } = event.requestContext
    let result;
    let validatedInput;
    try {
        switch (httpMethod) {
            case 'GET':
                console.log(`get request received with params: `, JSON.stringify(event.queryStringParameters))
                validatedInput = validate(event.queryStringParameters, getDTO)
                result = await get(validatedInput)
                return responseDTO(200, result)
            case 'POST':
                console.log(`create request received with params: `, JSON.stringify(event.body))
                validatedInput = validate(event.body, createDTO)
                result = await create(validatedInput)
                return responseDTO(200, result)
            case 'PUT':
                console.log(`update request received with params: `, JSON.stringify(event.body))
                validatedInput = validate(event.body, updateDTO)
                result = await update(validatedInput)
                return responseDTO(200, result)
            case 'DELETE':
                console.log(`delete request received with params: `, JSON.stringify(event.queryStringParameters))
                validatedInput = validate(event.queryStringParameters, removeDTO)
                result = await remove(event.queryStringParameters)
                return responseDTO(200, result)
            default:
                return responseDTO(405, 'Method not allowed')
        }
    }
    catch (err) {
        console.log('----------------------EXCEPTION OCCURRED----------------------')
        console.log(JSON.stringify(err))
        console.log(err.message)
        console.log('----------------------EXCEPTION END---------------------------')
        if (err instanceof ApplicationError) {
            return responseDTO(err.statusCode, err.message)
        }
        else
            return responseDTO(500, 'Internal Server Error')
    }
}