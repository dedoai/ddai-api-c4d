const { checkMethod, checkPath } = require('../utils')
const { create } = require('./functions/create')
const { get } = require('./functions/get')
const { remove } = require('./functions/remove')
const { update } = require('./functions/update')
const { okDTO } = require('./utils')

module.exports.handler = async (event) => {

    const { http } = event.requestContext
    const { method, path } = http
    let result;

    if (!checkMethod(method)) {
        return {
            statusCode: 405,
            body: JSON.stringify({
                message: 'Method not allowed'
            })
        }
    }
    if (!checkPath(path)) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'Path not found'
            })
        }
    }

    try {
        switch (method) {
            case 'GET':
                console.log('c4d get request received', JSON.stringify(event.pathParameters))
                result = await get(event.pathParameters)
                return okDTO(result)
            case 'POST':
                console.log('c4d create request received', JSON.stringify(event.body))
                result = await create(event.body)
                return okDTO(result)
            case 'PUT':
                console.log('c4d update request received', JSON.stringify(event.body))
                result = await update(event.body)
                return okDTO(result)
            case 'DELETE':
                console.log('c4d delete request received', JSON.stringify(event.pathParameters))
                result = await remove(event.pathParameters)
                return okDTO(result)
        }
    }
    catch (err) {
        console.error(err)
        if (err instanceof ApplicationError) {
            return {
                statusCode: err.statusCode,
                body: JSON.stringify({
                    message: err.message
                })
            }
        }
        else
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Internal Server Error'
                })
            }
    }
}