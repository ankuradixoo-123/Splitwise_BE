// const { deleteusers } = require("./Controller");

const getusers='SELECT * FROM users';
const getusersById='SELECT * FROM users WHERE id =$1';
const checkEmailExists='SELECT s FROM users s WHERE s.email=$1';
const addusers='INSERT INTO users (name,email,age,dob,password) VALUES ($1,$2,$3,$4,$5)';
const Registerusers='INSERT INTO users (name,email,password) VALUES ($1,$2,$3)';
const RemoveUsers='DELETE FROM users WHERE id =$1';
const updateusers='UPDATE users SET name=$1 WHERE id=$2 ';
const checkEmailExistsLogin= 'SELECT * FROM users WHERE email=$1';
// const RegisterUsersCheck='SELECT * FROM users WHERE email=$1'
module.exports={
    getusers,
    getusersById,
    checkEmailExists,
    addusers,
    RemoveUsers,
    updateusers,
    Registerusers,
    checkEmailExistsLogin
}