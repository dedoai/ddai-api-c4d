const { validateRemoveDTO } = require('../validators')
const { getDbConnection } = require('../db')
const ENTITY_NAME = 'c4d';

const remove = async (removeDTO) => {
  const value = validateRemoveDTO(removeDTO);
  const { id } = value;
  const query = `DELETE FROM ${ENTITY_NAME} WHERE id = $1 RETURNING id`;
  const result = await (await getDbConnection()).query(query, [id]);
  return result.rowCount > 0;
}

module.exports = {
  remove
};