const { create } = require('./functions/create')
const { get } = require('./functions/get')
const { remove } = require('./functions/remove')
const { update } = require('./functions/update')
const { responseDTO } = require('./utils')
const ApplicationError = require('./ApplicationError')
const handler = async (event) => {

    const { httpMethod } = event.requestContext
    let result;

    try {
        switch (httpMethod) {
            case 'GET':
                console.log('c4d get request received', JSON.stringify(event.queryStringParameters))
                result = await get(event.queryStringParameters)
                return responseDTO(200, result)
            case 'POST':
                console.log('c4d create request received', JSON.stringify(event.body))
                result = await create(event.body)
                return responseDTO(200, result)
            case 'PUT':
                console.log('c4d update request received', JSON.stringify(event.body))
                result = await update(event.body)
                return responseDTO(200, result)
            case 'DELETE':
                console.log('c4d delete request received', JSON.stringify(event.pathParameters))
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