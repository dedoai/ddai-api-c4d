const { validateUpdateDTO } = require('../validators')
const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const update = async (updateDTO) => {
  const value = validateUpdateDTO(updateDTO);
  const { title, description, id, status, category_id } = value;
  const query = `
      UPDATE ${ENTITY_NAME} 
      SET title = $1, description = $2, updated_at = $4, status = $5, category_id = $6
      WHERE id = $3
      RETURNING id
    `;
  const values = [title, description, id, new Date(), status, category_id];
  const result = await (await getDbConnection()).query(query, values);
  return result.rows[0]?.id
}
module.exports = {
  update
};