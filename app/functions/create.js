const { validateCreateDTO } = require('../validators')
const { getDbConnection } = require('../db')
const { ENTITY_NAME } = require('../constants')
const create = async (createDTO) => {
  const value = validateCreateDTO(createDTO);
  const { consumer_id, title, description, data_type, status, category_id } = value;
  const query = `
      INSERT INTO ${ENTITY_NAME} (consumer_id, title, description, data_type, status, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`;
  const values = [consumer_id, title, description, data_type, status, category_id];
  const c4d = await (await getDbConnection()).query(query, values);
  return c4d.rows[0]?.id
}
module.exports = {
  create
};