const { modules } = require('./functions');
const DEBUG = process.env.DEBUG || false;
const { responseDTO } = require('./utils')
const ApplicationError = require('./ApplicationError')
const { validate } = require('./validator')

exports.handler = async (event) => {
  try {
    const { requestContext, body, queryStringParameters } = event ?? {};
    const { httpMethod, authorizer, resourcePath } = requestContext ?? {};
    const key = httpMethod + '@' + resourcePath;
    const requestedModule = modules[key];

    if (!requestedModule) {
      return responseDTO(405, 'Method not allowed')
    }
    if (DEBUG)
      console.log(`get request received with params: `, JSON.stringify({ ...(body || queryStringParameters), user_id: authorizer?.principal }));
    const input = { ...(body || queryStringParameters) };

    if (authorizer?.principalId)
      input.user_id = authorizer?.principalId;

    const validatedInput = validate(input, requestedModule.validatorSchema);
    if (DEBUG)
      console.log(`validatedInput `, validatedInput);
    return responseDTO(200, await requestedModule.action(validatedInput));

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