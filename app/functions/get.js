const { getDbConnection } = require('../db')
const { validateGetDTO } = require('../validators')
const { full } = require('./full')
const { files } = require('./files')
const { MAX_LIMIT, MAX_OFFSET } = require('../utils')

const get = async (getDTO) => {
    const value = validateGetDTO(getDTO);
    let result;

    const id = value?.id
    if (value?.full) {
        result = await full(id, value?.limit, value?.offset)
        return result
    }
    if (value?.files) {
        result = await files(id, value?.limit, value?.offset)
        return result
    }
    const db = await getDbConnection()
    let query = `SELECT * FROM c4d`

    if (id) {
        query += ` WHERE id = $1`
        result = await db.query(query, [id])
    }
    else {
        query += ` OFFSET $1 LIMIT $2`
        result = await db.query(query, [value?.offset || MAX_OFFSET, value?.limit || MAX_LIMIT])
    }
    return id ? result.rows.pop() : result.rows
}

module.exports = {
    get
}