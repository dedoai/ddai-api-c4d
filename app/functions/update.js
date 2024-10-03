const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const { updateDTO } = require('../validatorSchemas/update')
const update = async (input) => {
  const { title, description, id, status, category_id, user_id } = input;
  const db = await getDbConnection()
  const query = `
      UPDATE ${ENTITY_NAME} 
      SET title = $1, description = $2, updated_at = $4, status = $5, category_id = $6
      WHERE id = $3 AND user_id = $7 
      RETURNING id`;
  const values = [title, description, id, new Date(), status, category_id, user_id];
  const result = await db.query(query, values);
  await db.end()
  return result?.rows[0]?.id
}
module.exports = {
  fn: update,
  method: 'PUT',
  path: '/v1/c4d',
  schema: updateDTO
};

