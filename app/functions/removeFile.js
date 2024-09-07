const { getDbConnection } = require('../db')
const removeFile = async (id) => {
    const fileQuery = `
      DELETE FROM files
      WHERE id = $1
      RETURNING *`;
    const fileValues = [id];
    const result = await getDbConnection().query(fileQuery, fileValues)
    return result.rows[0]
}

module.exports = {
    removeFile
};