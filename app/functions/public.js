const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const { getDTO } = require('../validatorSchemas/get')
const DEBUG = process.env.DEBUG || false;
const full = async ( input ) => {
  let id 	= input.id;
  let user_id   = input.user_id;
  let result;
  const db = await getDbConnection()
  const params = [user_id]
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
        us.username as owner
        FROM public.${ENTITY_NAME} ${ENTITY_NAME}
        inner join categories cat on ${ENTITY_NAME}.category_id = cat.id
        inner join users user on ${ENTITY_NAME}.user_id = user.id`

  if( DEBUG )
	console.log('Query:', query)
  result = await db.query(query, params)
  await db.end()
  return id ? result?.rows?.pop() : result.rows
}

module.exports = {
  fn: full,
  method: 'GET',
  path: '/v1/c4d/public',
  schema: getDTO
};
