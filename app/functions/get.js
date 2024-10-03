const { getDbConnection } = require('../db')
const { full } = require('./full')
const { files } = require('./files')
const { MAX_LIMIT, MAX_OFFSET } = require('../utils')
const { ENTITY_NAME } = require('../constants')
const { getDTO } = require('../validatorSchemas/get')

const get = async (input) => {
  let result;
  const params = [input.user_id]
  const id = input?.id
  if (input?.full) {
    result = await full(id, user_id, input?.limit, input?.offset)
    return result
  }
  if (input?.files) {
    result = await files(id, user_id, input?.limit, input?.offset)
    return result
  }
  const db = await getDbConnection()
  let query = `SELECT * FROM ${ENTITY_NAME} WHERE user_id = $1`

  if (id) {
    query += ` AND id = $2`
    result = await db.query(query, params.push(id))
  }
  else {
    query += ` OFFSET $2 LIMIT $3`
    params.push(input?.offset || MAX_OFFSET, input?.limit || MAX_LIMIT)
    result = await db.query(query, params)
  }
  await db.end();
  return id ? result?.rows?.pop() : result.rows
}

module.exports = {
  fn: get,
  method: 'GET',
  path: '/v1/c4d',
  schema: getDTO
};
