const { Pool } = require('pg');

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'ddai',
    password: 'your_password',
    port: 5432,
});

const getDbConnection = () => pool

module.exports = { getDbConnection }