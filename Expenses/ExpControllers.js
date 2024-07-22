const pool = require('../db')
const queries=require('./Expqueries');


const Check=(req,res)=>{
 res.send('it is working fine!')
}
module.exports={
    Check
}