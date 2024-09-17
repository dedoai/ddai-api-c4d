const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const full = async (id) => {
    let result;
    const db = await getDbConnection()
    let query = `SELECT
        ${ENTITY_NAME}.title, 
        ${ENTITY_NAME}.description,
        ${ENTITY_NAME}.data_type,
        ${ENTITY_NAME}.reward,
        ${ENTITY_NAME}.status,
        ${ENTITY_NAME}.created_at,
        ${ENTITY_NAME}.updated_at,
        ${ENTITY_NAME}.id,
        ${ENTITY_NAME}.likes,
        cat.name as category,
        us.username as owner
        FROM public.${ENTITY_NAME} ${ENTITY_NAME}
        inner join categories cat on ${ENTITY_NAME}.category_id = cat.id 
        inner join users us on ${ENTITY_NAME}.consumer_id = us.id WHERE ${ENTITY_NAME}.id = $1`

    result = await db.query(query, [id])
    await db.end()
    return id ? result.rows.pop() : result.rows
}

module.exports = {
    full
}