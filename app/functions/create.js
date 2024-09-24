const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const create = async (input) => {
  const { user_id, title, description, data_type, status, category_id } = input;
  const db = await getDbConnection()
  const query = `
      INSERT INTO ${ENTITY_NAME} (user_id, title, description, data_type, status, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`;
  const values = [user_id, title, description, data_type, status, category_id];
  const c4d = await db.query(query, values);
  await db.end()
  return c4d?.rows[0]?.id
}
module.exports = {
  create
};