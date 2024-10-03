const { getDbConnection } = require('../../db')
const { ENTITY_NAME } = require('../../constants')

const action = async (input) => {
  input.updated_at = new Date()
  const { id, user_id } = input
  let query = `
      UPDATE ${ENTITY_NAME} 
      SET`
  Object.keys(input).forEach((key, index) => {
    if (key === 'id' || key === 'user_id') return
    query += ` ${key} = $${index + 1},`

  })
  query = query.slice(0, -1)
  const values = Object.values(input)
  query += ` WHERE id = $${values.indexOf(id) + 1} AND user_id = $${values.indexOf(user_id) + 1} RETURNING id`


  const db = await getDbConnection()
  const result = await db.query(query, values);
  await db.end()
  return result?.rows[0]?.id
}
module.exports = { action };

