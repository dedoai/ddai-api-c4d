const fnMap = require('./functions');
const DEBUG = process.env.DEBUG || false;
const { responseDTO } = require('./utils')
const ApplicationError = require('./ApplicationError')
const { validate } = require('./validator')

exports.handler = async (event) => {
    try {
	let { requestContext, body, queryStringParameters }=event??{};
        let { httpMethod, authorizer, resourcePath } = requestContext??{};
        let fnKey=httpMethod+'@'+resourcePath;
        let fnDef=fnMap[fnKey];
        if( fnDef !== undefined ){
	        let result;
		if( DEBUG )
			console.log(`get request received with params: `, JSON.stringify({ ...(body ||queryStringParameters), user_id: authorizer?.principal>
                let validatedInput = validate({ ...(body ||queryStringParameters), user_id: authorizer?.principalId }, fnDef.schema )
                return responseDTO(200, await fnDef.fn(validatedInput) );
	}else{
		// return 405 Method not Allowed
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
