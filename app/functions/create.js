const { validateCreateDTO } = require('../validators')
const { getDbConnection } = require('../db')
const { addFile } = require('./addFile')
const ENTITY_NAME = 'c4d'
const create = async (createDTO) => {
  const value = validateCreateDTO(createDTO);
  const { consumer_id, title, description, data_type, reward, status, files, category_id } = value;
  const query = `
      INSERT INTO c4d (consumer_id, title, description, data_type, reward, status, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
  const values = [consumer_id, title, description, data_type, reward, status, category_id];
  const c4d = await getDbConnection().query(query, values);

  const insertFilePromises = []
  for (const file of files) {
    insertFilePromises.push(addFile({ ...file, entity_name: ENTITY_NAME, entity_id: c4d.rows[0].id }))
  }
  if (insertFilePromises.length > 0)
    await Promise.all(insertFilePromises)
  return c4d.rows[0]
}
module.exports = {
  create
};