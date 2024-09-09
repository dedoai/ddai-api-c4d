const { getDbConnection } = require('../db')
const { validateGetFilesDTO } = require('../validators')

const getFiles = async (getDTO) => {
    const value = validateGetFilesDTO(getDTO);
    const { id, limit, offset } = value
    const db = await getDbConnection()
    const query = 'SELECT file_name,file_type,bucket_url FROM files WHERE entity_id = $1 and entity_name = $2 OFFSET $3 LIMIT $4'
    const result = await db.query(query, [id, 'c4d', limit, , offset])
    return result.rows.length === 1 ? result.rows[0] : result.rows
}

module.exports = {
    getFiles
}