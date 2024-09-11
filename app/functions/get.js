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
    else {
        query += ' OFFSET $1 LIMIT $2'
        result = await db.query(query, [value?.offset, value?.limit])
    }
    return id ? result.rows.pop() : result.rows
}

module.exports = {
    get
}