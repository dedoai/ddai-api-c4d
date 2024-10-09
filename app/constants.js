const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;
const MAX_OFFSET = 1000;
const DEFAULT_OFFSET = 0;
const ENTITY_NAME = 'c4d';
const TRANSFORM_FORMATS = { snake: 'snakeCase', camel: 'camelCase' }
const CORS_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
}
const ERRORS = {
  400: { code: 'BAD_REQUEST' },
  405: { code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' },
  500: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' }
}
module.exports = {
  MAX_LIMIT,
  MAX_OFFSET,
  ENTITY_NAME,
  CORS_HEADERS,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  TRANSFORM_FORMATS,
  ERRORS
}
