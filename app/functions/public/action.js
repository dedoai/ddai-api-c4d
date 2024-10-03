const { getDbConnection } = require('../../db')
const { ENTITY_NAME } = require('../../constants')
const action = async (input) => {

  const { id, limit, offset } = input;
  const params = []
  let query = `SELECT
        ${ENTITY_NAME}.title,
        ${ENTITY_NAME}.description,
        ${ENTITY_NAME}.data_type,
        ${ENTITY_NAME}.reward,
        ${ENTITY_NAME}.status,
        ${ENTITY_NAME}.created_at,
        ${ENTITY_NAME}.updated_at,
        ${ENTITY_NAME}.id,
        ${ENTITY_NAME}.likes,
        cat.name as category,
        usr.username as owner
        FROM public.${ENTITY_NAME} ${ENTITY_NAME}
        inner join categories cat on ${ENTITY_NAME}.category_id = cat.id
        inner join users usr on ${ENTITY_NAME}.user_id = usr.id `

  if (id) {
    query += ` where ${ENTITY_NAME}.id = $1`
    params.push(id)
  }
  else {
    query += ` OFFSET $1 LIMIT $2`
    params.push(offset, limit)
  }

  const db = await getDbConnection()
  const result = await db.query(query, params)
  await db.end();
  return id ? result?.rows?.pop() : result.rows
}

module.exports = { action };
