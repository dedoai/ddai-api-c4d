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

const event = {
    requestContext: {

        "resource": "/v1/c4d", "path": "/v1/c4d", "httpMethod": "GET", "headers": null, "multiValueHeaders": null, "multiValueQueryStringParameters": { "a": ["1"] }, "pathParameters": null, "stageVariables": null, "requestContext": {
            "resourceId": "rn3ezu", "resourcePath": "/v1/c4d", "httpMethod": "POST", "extendedRequestId": "eP8mpFsJoAMFVCA=", "requestTime": "17/Sep/2024:12:22:40 +0000", "path": "/v1/c4d", "accountId": "381492109137", "protocol": "HTTP/1.1", "stage": "test-invoke-stage", "domainPrefix": "testPrefix", "requestTimeEpoch": 1726575760625, "requestId": "308baf38-45ef-44a0-a3af-5f78eb289b80"
        }
    },
    "queryStringParameters": { "id": "bd173750-8d5a-4815-a8b0-d6d00902853a", files: true },
}
handler(event)