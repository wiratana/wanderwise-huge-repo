const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/users');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;