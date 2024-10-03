const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;
const MAX_OFFSET = 100000;
const DEFAULT_OFFSET = 0;
const ENTITY_NAME = 'c4d';
const CORS_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
}

module.exports = {
  MAX_LIMIT,
  MAX_OFFSET,
  ENTITY_NAME,
  CORS_HEADERS,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET
}
