const { validateCreateDTO } = require('../validators')
const { getDbConnection } = require('../db')

const { v4: uuidv4 } = require('uuid');

const create = async (createDTO) => {
    const value = validateCreateDTO(createDTO);
    const { consumerId, title, description, data_type, reward, status } = value;
    const id = uuidv4();
    const query = `
      INSERT INTO c4d (id, consumerId, title, description, data_type, reward, status,created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`;
    const values = [id, consumerId, title, description, data_type, reward, status, new Date()];
    const result = await getDbConnection().query(query, values);
    return result.rows[0]
}

module.exports = {
    create
};