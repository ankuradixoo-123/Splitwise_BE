const pool = require('../db')
const queries=require('./Expqueries');


const Check=(req,res)=>{
 res.send('it is working fine!')
}
const getGroups = (req, res) => {
    pool.query(queries.getGroups, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  };

  const getGroupsById=(req,res)=>{
    const id=parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send('Invalid group ID');
    }

    pool.query(queries.getGroupById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
  }

 
  const addGroup=(req,res)=>{
    const {name,created_at}=req.body;
    pool.query(queries.addGroup,[name,created_at],(error,results)=>{
      if(error)throw error;
      res.status(201).json(results.rows[0]);
    })
  }

  const updateGroup=(req,res)=>{
    const {name}=req.body;
    const id=parseInt(req.body.id);

    pool.query(queries.getGroupById,[id],(error,results)=>{
      if(error){
        return res.status(500).send('server error');
      }
      const noGroupFound=results.rows.length===0;
      if(noGroupFound){
        return res.status(404).send('Group not found')
      }
      pool.query(queries.updateGroup, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send('Group updated successfully');
      });
    })
  }


   // normally u dont do delete like this u have to do soft delete lateron 
  

  // const deleteGroup=(req,res)=>{
  //   const {id}=req.body;
  //   pool.query(queries.removeGroup,[id],(error,results)=>{
  //     if(error) throw error;
  //     res.status(200).send('group is deen deleted sucessfully!');
  //   })
  // }


  // Now we can create routes for my group members

  // List all members of a group
const listGroupMembers = (req, res) => {
  const group_id = parseInt(req.params.group_id);

  pool.query(queries.getGroupMembers, [group_id], (error, results) => {
    if (error) throw error;

    if (results.rows.length === 0) {
      return res.status(404).send('No members found for this group');
    }

    res.status(200).json(results.rows);
  });
}; 

  const addGroupMember=(req,res)=>{
    const {group_id,user_id}=req.body;

    pool.query(queries.checkGroupAndUserExist,[group_id,user_id],(error,results)=>{
      if(error)throw error;

      if(results.rows.length>0){
        return res.status(400).send('user already exists inn this group!');
      }

      pool.query(queries.addGroupMember,[group_id,user_id],(error,results)=>{
            if(error) throw error;
            return  res.status(201).send('group member added')
      })
    })
  }

   const removeGroupMember=(req,res)=>{
    const{group_id,user_id}=req.body;

    pool.query(queries.checkGroupAndUserExist,[group_id,user_id],(error,results)=>{
      if(error)throw error;

      if(results.rows.length===0){
        return res.status(404).send('user does not exists');
      }

      pool.query(queries.removeGroupMember,[group_id,user_id],(error,results)=>{
        if(error)throw error;

        return res.status(200).send('group member removed!');
      })
    })
   }


   /// Now the routes creation part for expenses_participents

   const GetGroup_WithExpenses=(req,res)=>{
    let amount=1000;
    pool.query(queries.getExpenseParticipants,(error,results)=>{
      if(error)throw error;
      
      return res.status(200).send(results.rows);
    })
   }


   const GetUserExpenses_ById=(req,res)=>{
    const group_id=parseInt(req.params.group_id);

    if(isNaN(group_id)){
      res.status(400).send('invalid group id');
    }

    pool.query(queries.getExpenseParticipantById, [group_id], (error, results) => {
      if (error) throw error;
      if (results.rows.length === 0) {
        return res.status(404).send('Group not found');
      }
      res.status(200).json(results.rows);
    });
   }




   const addGroupExpense = async (req, res) => {
    const date=new Date().toISOString();
    const { group_id, category, notes} = req.body;
    const amount = 1000;  // Using a dummy amount for now
  
    try {
      await pool.query('BEGIN');
  
      // Get all members of the group
      const groupMembersResult = await pool.query(queries.fetchGroupMembers, [group_id]);
      const groupMembers = groupMembersResult.rows;
  
      if (groupMembers.length === 0) {
        await pool.query('ROLLBACK');
        return res.status(404).send('No members found for this group');
      }
  
      
      const perMemberShare = amount / groupMembers.length;
  
      
      const insertData = groupMembers.map(member => `(${group_id}, ${member.user_id}, '${date}','${notes}', '${category}', ${perMemberShare})`).join(',');
  
      
      const bulkInsertQuery = `
        INSERT INTO expense_participants (group_id, payer_id,date, notes, category, amount_owe)
        VALUES ${insertData}
      `;
  
      await pool.query(bulkInsertQuery);
  
      await pool.query('COMMIT');
      res.status(201).send('Expense added and distributed successfully');
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error('Error adding group expense:', error);
      res.status(500).send('Server error');
    }
  };
  
module.exports={
    Check,
    getGroups,
    getGroupsById,
    addGroup,
    updateGroup,
    addGroupMember,
    listGroupMembers,
    removeGroupMember,
    GetGroup_WithExpenses,
    GetUserExpenses_ById,
    addGroupExpense
}