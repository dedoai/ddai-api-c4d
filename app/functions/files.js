const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const files = async (id, user_id, limit, offset) => {
  const db = await getDbConnection()
  const query = `SELECT file_name,file_type,bucket_url FROM files WHERE entity_id = $1 and user_id=$2 and entity_name = $3 OFFSET $4 LIMIT $5`
  const result = await db.query(query, [id, user_id, ENTITY_NAME, limit, offset])
  return result.rows
}

module.exports = {
  files
}
