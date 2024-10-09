const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager')
const ld = require('lodash')
const { CORS_HEADERS } = require('./constants')

const client = new SecretsManagerClient();
const ERRORS = {
  400: { code: 'BAD_REQUEST' },
  405: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' },
  500: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' }
}

const manageResponse = (statusCode, body, headers) => {
  return statusCode == 200 ? {
    statusCode: statusCode,
    headers: {
      ...CORS_HEADERS,
      ...headers
    },
    body: JSON.stringify({ data: body })
  } : {
    statusCode: statusCode,
    errorCode: ERRORS[statusCode].code,
    description: ERRORS[statusCode].message || body,
    headers: {
      ...CORS_HEADERS,
      ...headers
    },
    body: JSON.stringify({ data: null })
  }
}

const getDbSecretPwd = async () => {
  const command = new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_PASS_ID })
  const response = await client.send(command);
  if (!response?.SecretString)
    throw new Error('Failed to get secret ')
  return JSON.parse(response?.SecretString).password
}

const transformInput = (input, format) => {

  const fn = ld[format]
  if (!fn) throw new Error('Invalid transformation format')

  return input ? Object.keys(input).reduce((acc, key) => {
    acc[fn(key)] = input[key]
    return acc
  }, {}) : {}
}

module.exports = {
  manageResponse,
  getDbSecretPwd,
  transformInput
}
