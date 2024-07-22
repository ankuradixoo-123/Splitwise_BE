const { Pool } = require('pg');

const poolExpensess = new Pool({
    user: "postgres",
    host: "localhost",
    database: 'expensess',
    password: 'Ankur@2002',
    port: 5432,
});

module.exports = poolExpensess;
