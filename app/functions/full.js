const { getDbConnection } = require('../db')
const { validateGetDTO } = require('../validators')

const full = async (getDTO) => {
    const value = validateGetDTO(getDTO);
    const id = value?.id
    const db = await getDbConnection()
    let query = `SELECT c4d.title, 
        c4d.description,
        c4d.data_type,
        c4d.reward,
        c4d.status,
        c4d.created_at,
        c4d.updated_at,
        c4d.id,
        c4d.likes,
        cat.name as category,
        us.username as owner
        FROM public.c4d c4d
        inner join categories cat on c4d.category_id = cat.id 
        inner join users us on c4d.consumer_id = us.id `
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
    full
}