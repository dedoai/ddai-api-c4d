const { Pool, types } = require('pg');
types.setTypeParser(1700, (val) => parseFloat(val));

const { getDbSecretPwd } = require('./utils')

const getDbConnection = async () => {
  const pwd = await getDbSecretPwd()
  return new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: pwd,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
  })
}

module.exports = { getDbConnection }
