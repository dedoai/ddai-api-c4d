const { getDbConnection } = require('../db')
const addFile = async (fileDTO) => {
    const { file_name, file_type, bucket_url, entity_name, entity_id } = fileDTO;
    const fileQuery = `
      INSERT INTO files (entity_name, entity_id, file_name, file_type, bucket_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const fileValues = [entity_name, entity_id, file_name, file_type, bucket_url];
    const result = await getDbConnection().query(fileQuery, fileValues)
    return result.rows[0]
}

module.exports = {
    addFile
};