const { Pool } = require('pg');
const { getDbSecretPwd } = require('./utils')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: getDbSecretPwd(),
    port: process.env.DB_PORT
});

const getDbConnection = () => pool

module.exports = { getDbConnection }