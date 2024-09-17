const { getDbConnection } = require('../db')
const { full } = require('./full')
const { files } = require('./files')
const { MAX_LIMIT, MAX_OFFSET } = require('../utils')
const { ENTITY_NAME } = require('../constants')

const get = async (input) => {
    let result;

    const id = input?.id
    if (input?.full) {
        result = await full(id, input?.limit, input?.offset)
        return result
    }
    if (input?.files) {
        result = await files(id, input?.limit, input?.offset)
        return result
    }
    const db = await getDbConnection()
    let query = `SELECT * FROM ${ENTITY_NAME}`

    if (id) {
        query += ` WHERE id = $1`
        result = await db.query(query, [id])
    }
    else {
        query += ` OFFSET $1 LIMIT $2`
        result = await db.query(query, [input?.offset || MAX_OFFSET, input?.limit || MAX_LIMIT])
    }
    await db.end();
    return id ? result.rows.pop() : result.rows
}

module.exports = {
    get
}