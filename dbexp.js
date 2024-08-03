const { Pool } = require('pg');

const poolExpensess = new Pool({
    user: "postgres",
    host: "localhost",
    database: 'expensess',
    password: 'Ankur@2002',
    port: 5432,
});

module.exports = poolExpensess;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUzLCJpYXQiOjE3MjE5ODU0MTUsImV4cCI6MTcyMjg0OTQxNX0.cteOO7JKhE-WOydaqE1lN7J6M3o7hTR524zLMkAami8