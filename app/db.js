const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ddi',
    password: 'gius',
    port: 5432,
});

const getDbConnection = () => pool

module.exports = { getDbConnection }