const { getDbConnection } = require('../../db');
const { ENTITY_NAME } = require('../../constants');

const action = async (input) => {
  const { id, user_id, limit, offset } = input;
  const params = [user_id];
  let query = `SELECT
        ${ENTITY_NAME}.title,
        ${ENTITY_NAME}.description,
        ${ENTITY_NAME}.data_type,
        ${ENTITY_NAME}.reward::numeric as reward,
        ${ENTITY_NAME}.status,
        ${ENTITY_NAME}.created_at,
        ${ENTITY_NAME}.updated_at,
        ${ENTITY_NAME}.id,
        ${ENTITY_NAME}.likes::numeric as likes,
        cat.name as category,
        usr.username as owner,
        COUNT(*) OVER() AS total_count
        FROM public.${ENTITY_NAME} ${ENTITY_NAME}
        INNER JOIN categories cat ON ${ENTITY_NAME}.category_id = cat.id
        INNER JOIN users usr ON ${ENTITY_NAME}.user_id = usr.id
        WHERE ${ENTITY_NAME}.user_id = $1`;

  if (id) {
    query += ` AND ${ENTITY_NAME}.id = $2`;
    params.push(id);
  } else {
    query += ` OFFSET $2 LIMIT $3`;
    params.push(offset, limit);
  }

  const db = await getDbConnection();
  const result = await db.query(query, params);
  await db.end();

  const rows = result.rows;
  const totalResults = rows.length > 0 ? parseInt(rows[0].total_count, 10) : 0;

  return {
    totalResults,
    records: id ? rows.pop() : rows
  };
};

module.exports = { action };
