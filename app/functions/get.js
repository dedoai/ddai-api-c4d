const { getDbConnection } = require('../db')
const { validateGetDTO } = require('../validators')

const get = async (getDTO) => {
    const value = validateGetDTO(getDTO);
    const id = value?.id
    const db = await getDbConnection()
    let query = 'SELECT * FROM c4d'
    let result;
    if (id) {
        query += ' WHERE id = $1'
        result = await db.query(query, [id])
    }
    else result = await db.query(query)
    return result.rows
}

module.exports = {
    get
}