const { checkMethod, checkPath } = require('../utils')
const { create } = require('./functions/create')
const { get } = require('./functions/get')
const { remove } = require('./functions/remove')
const { update } = require('./functions/update')
const { responseDTO } = require('./utils')

module.exports.handler = async (event) => {

    const { http } = event.requestContext
    const { method, path } = http
    let result;

    if (!checkMethod(method)) {
        return responseDTO(405, 'Method not allowed')

    }
    if (!checkPath(path)) {
        return responseDTO(404, 'Path not found')
    }

    try {
        switch (method) {
            case 'GET':
                console.log('c4d get request received', JSON.stringify(event.pathParameters))
                result = await get(event.pathParameters)
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
                result = await remove(event.pathParameters)
                return responseDTO(200, result)
        }
    }
    catch (err) {
        console.error(err)
        if (err instanceof ApplicationError) {
            return responseDTO(err.statusCode, err.message)
        }
        else
            return responseDTO(500, 'Internal Server Error')
    }
}