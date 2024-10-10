const { getDbConnection } = require('../../db')
const { ENTITY_NAME } = require('../../constants')

const action = async (input) => {

  const { entity_id, user_id, limit, offset } = input
  const params = [ENTITY_NAME, user_id]

  let query = `SELECT file_name,file_type,bucket_url,COUNT(*) OVER() AS total_count FROM files WHERE entity_name = $1 and user_id=$2`

  if (entity_id) {
    query += ` and entity_id=$3 OFFSET $4 LIMIT $5`
    params.push(entity_id, offset, limit)
  }
  else {
    query += ` OFFSET $3 LIMIT $4`
    params.push(offset, limit)
  }
  const db = await getDbConnection()
  const result = await db.query(query, params)
  await db.end();
  const rows = result.rows;
  const totalResults = rows.length > 0 ? parseInt(rows[0].total_count, 10) : 0;

  return {
    totalResults,
    records: id ? rows.pop() : rows
  };
}

module.exports = { action };
