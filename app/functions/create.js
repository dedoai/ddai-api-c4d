const { validateCreateDTO } = require('../validators')
const { getDbConnection } = require('../db')

const { v4: uuidv4 } = require('uuid');

const create = async (createDTO) => {
    const value = validateCreateDTO(createDTO);
    const { consumerId, title, description, dataType, reward, status } = value;
    const id = uuidv4();
    const query = `
      INSERT INTO c4d (id, consumerId, title, description, dataType, reward, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
    const values = [id, consumerId, title, description, dataType, reward, status];
    const result = await getDbConnection().query(query, values);
    return result
}

module.exports = {
    create
};