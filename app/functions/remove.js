const { validateRemoveDTO } = require('../validators')
const { getDbConnection } = require('../db')

const remove = async (removeDTO) => {
  const value = validateRemoveDTO(removeDTO);
  const { id } = value;
  const query = 'DELETE FROM c4d WHERE id = $1 RETURNING *';
  const result = await getDbConnection().query(query, [id]);
  return result.rowCount > 0;
}

module.exports = {
  remove
};