const Pool=require('pg').Pool;

 const pool= new Pool({
    user: "postgres",
    host:"localhost",
    database:'users',
    password:'Ankur@2002',
    port:5432,
});

module.exports=pool;
