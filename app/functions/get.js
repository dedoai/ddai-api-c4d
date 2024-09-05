const { getDbConnection } = require('../db')
const { validateGetDTO } = require('../validators')

const get = async (getDTO) => {
    const value = validateCreateDTO(getDTO);
    const { id } = value
    const db = await getDbConnection()
    const query = 'SELECT * FROM c4d'
    if (id) {
        query += ' WHERE id = $1'
    }
    const result = await db.query(query, [id])
    return result.rows
}

module.exports = {
    get
}