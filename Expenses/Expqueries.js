const getGroups = 'SELECT * FROM groups';
const getGroupById = 'SELECT * FROM groups WHERE id = $1';
const addGroup = 'INSERT INTO groups (name, created_at) VALUES ($1, $2) RETURNING *';
const updateGroup = 'UPDATE groups SET name = $1 WHERE id = $2';
const removeGroup = 'DELETE FROM groups WHERE id = $1';
const checkGroupAndUserExist = `
  SELECT * FROM group_members
  WHERE group_id = $1 AND user_id = $2
`;

const addGroupMember = `
  INSERT INTO group_members (group_id, user_id)
  VALUES ($1, $2)
`;

const removeGroupMember = `
  DELETE FROM group_members
  WHERE group_id = $1 AND user_id = $2
`;

const getGroupMembers = `
  SELECT * FROM users
  INNER JOIN group_members ON users.id = group_members.user_id
  WHERE group_members.group_id = $1
`;

const getExpenseParticipants = 'SELECT * FROM expense_participants';
const getExpenseParticipantByGroupId = 'SELECT u.name, e.* FROM expense_participants e left join users u on u.id = e.payer_id  WHERE e.group_id = $1';
const getExpenseParticipantById = 'SELECT * FROM expense_participants WHERE id = $1';
const fetchGroupMembers = `
  SELECT user_id FROM group_members WHERE group_id = $1;
`;
const addExpenseParticipant = 'INSERT INTO expense_participants (group_id, payer_id, date, notes, category, amount_owe) VALUES ($1, $2, $3, $4, $5, $6)';

const updateBalance = `
  UPDATE balances
  SET amount_owed = amount_owed + $1
  WHERE user_id = $2 AND group_id = $3;
`;
module.exports = {
  getGroups,
  getGroupById,
  addGroup,
  updateGroup,
  removeGroup,
  checkGroupAndUserExist,
  addGroupMember,
  removeGroupMember,
  getGroupMembers,
  getExpenseParticipants,
  getExpenseParticipantById,
  getExpenseParticipantByGroupId,
  fetchGroupMembers,
  updateBalance,
  addExpenseParticipant
};
