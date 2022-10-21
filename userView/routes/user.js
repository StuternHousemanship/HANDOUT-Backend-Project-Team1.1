const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const {
  viewCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../service/user')


router.get('/showMe', authenticateUser, viewCurrentUser);
router.patch('/updateUser', authenticateUser, updateUser);
router.patch('/updateUserPassword',authenticateUser, updateUserPassword);



module.exports = router;