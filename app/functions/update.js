const { validateUpdateDTO } = require('../validators')
const { getDbConnection } = require('../db')

const update = async (updateDTO) => {
    const value = validateUpdateDTO(updateDTO);
    const { title, description, id } = value;
    const query = `
      UPDATE c4d
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *
    `;
    const values = [title, description, id];
    const result = await getDbConnection().query(query, values);
    return result
}

module.exports = {
    update
};