const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const { removeDTO } = require('../validatorSchemas/remove')

const remove = async (input) => {
  const { id, user_id } = input;
  const db = await getDbConnection()
  const query = `DELETE FROM ${ENTITY_NAME} WHERE id = $1 AND user_id = $2 RETURNING id`;
  const result = await db.query(query, [id, user_id]);
  await db.end()
  return result.rowCount > 0;
}

module.exports = {
  fn: remove,
  method: 'DELETE',
  path: '/v1/c4d',
  schema: removeDTO
};
