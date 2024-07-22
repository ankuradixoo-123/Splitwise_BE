const pool = require('../../RESTAPI/db')
const queries=require('./queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getusers=(req,res)=>{
  pool.query(queries.getusers,(error,results)=>{
    if(error) throw error;
    res.status(200).json(results.rows);
  })
};

const getusersById=(req,res)=>{
    const id=parseInt(req.params.id);
    // Validate id
  if (isNaN(id)) {
    return res.status(400).send('Invalid user ID');
  }

    pool.query(queries.getusersById,[id],(error,results)=>{
      if(error) throw error;
        res.status(200).json(results.rows)
    })
}

const addUsers = (req, res) => {
  const { name, email, age, dob,password } = req.body;

  //hash the password
 bcrypt.hash(password,10,(error, hashedPassword)=>{
  if(error) throw error;
 

  // Check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;

    if (results.rows.length) {
      return res.status(400).send('Email already taken!');
    }

    // Add users to the db with hash passwords
    pool.query(queries.addusers, [name, email, age, dob,password ], (error, results) => {
      if (error) throw error;
      res.status(201).send('Student created successfully!');
    });
    });
  });
};



//Delete user from the db
const deleteusers=(req,res)=>{
  const id=parseInt(req.params.id);

  pool.query(queries.RemoveUsers,[id],(error,results)=>{

    if (error) throw error;

    const noUserFound=!results.rows.length===0;
    if(noUserFound){
      return  res.status(404).send('That user is not existed in the database!')
    }

    pool.query(queries.RemoveUsers,[id],(error,results)=>{
      if(error) throw error;
      res.status(200).send("student removed sucessfully!")
    })
  })
}


//Updations in the users
const UpdateUsers=(req,res)=>{
 

  const id=parseInt(req.params.id);
  const {name,password}=req.body;

  pool.query(queries.getusersById,[id],(error,results)=>{
   
    if (error) {
      return res.status(500).send('Server error');
    }

    const noUserFound=results.rows.length===0;
    if(noUserFound){
      return  res.status(404).send('That user is not existed in the database!')
    }

    pool.query(queries.updateusers,[name,id],(error,results)=>{
      if(error)throw error;
      res.status(200).send('student updated sucessfully!')
    })
  })
}

//Register a particular user!
const register=(req,res)=>{

  const {name,email,password}=req.body;

  pool.query(queries.checkEmailExists,[email],(error,results)=>{
        if(error) throw error;

        if(results.rows.length) return res.status(400).send('invalid credentails!');

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

      
      pool.query(queries.Registerusers,[name,email,hash],(err,data)=>{
        if(error) throw error;
         res.status(201).send('user is been sucessfully registered!');
      })
  })
}

const login = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  pool.query(queries.checkEmailExistsLogin, [email], (error, results) => {
    if (error) {
    
      return res.status(500).send('Server error');
    }

    if (results.rows.length === 0) {
      return res.status(400).send('Invalid credentials!');
    }

    const user = results.rows[0];

    console.log('Retrieved user:', user);
    console.log('User password:', user.password);

    if (!user.password) {
      console.error('Password is undefined for the user:', user);
      return res.status(500).send('Server error');
    }



    // Compare passwords
    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) {
        
        return res.status(500).send('Server error');
      }

      if (isMatch) {
        // Generate JWT
        const token = jwt.sign({ userId: user.id }, 'jwt_secret', { expiresIn: '24h' });
        console.log('password is sucessfully matched!')
        return res.status(200).json({ token });
      } else {
        return res.status(400).send('Invalid credentials!');
      }
    });
  });
};

module.exports={
getusers,
getusersById,
addUsers,
deleteusers,
UpdateUsers,
register,
login
};