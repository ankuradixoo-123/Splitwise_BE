const { Router } = require('express')
const controller=require('./ExpControllers');

const router=Router();

router.get('/',controller.Check)
router.get('/groups',controller.getGroups)
router.get('/groups/:id',controller.getGroupsById)
router.post('/groups',controller.addGroup);
// router.delete('/groups/:id',controller.deleteGroup);
router.put('/groups/:id',controller.updateGroup)
router.post('/groups/addMembers',controller.addGroupMembers)
router.get('/getGroup/:group_id',controller.listGroupMembers)
router.post('/removeGroupMember/:user_id',controller.removeGroupMember)
router.get('/ExpensesParticipants',controller.GetGroup_WithExpenses)
router.get('/ExpensesParticipantsById/:group_id',controller.GetUserExpenses_ById)
router.post('/groups/:group_id/expenses',controller.addGroupExpense)
router.get('/GetExpByGroup/:group_id',controller.GetExpensesByGroupId)

module.exports=router;