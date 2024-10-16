const { getDbConnection } = require('../../db')
const { ENTITY_NAME } = require('../../constants')
const action = async (input) => {
  const { user_id, title, description, data_type, status, category_id, telegram_topic, dataset_price, dataset_limit } = input;
  const query = `
      INSERT INTO ${ENTITY_NAME} (user_id, title, description, data_type, status, category_id, telegram_topic, dataset_price, dataset_limit )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id`;
  const values = [user_id, title, description, data_type, status, category_id, telegram_topic, dataset_price, dataset_limit];

  const db = await getDbConnection()
  const c4d = await db.query(query, values);
  await db.end()
  return c4d?.rows[0]?.id
}

module.exports = { action };
