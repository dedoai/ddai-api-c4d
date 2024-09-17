const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const files = async (id, limit, offset) => {
    const db = await getDbConnection()
    const query = `SELECT file_name,file_type,bucket_url FROM files WHERE entity_id = $1 and entity_name = $2 OFFSET $3 LIMIT $4`
    const result = await db.query(query, [id, ENTITY_NAME, limit, offset])
    return result.rows
}

module.exports = {
    files
}