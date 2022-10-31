import express from 'express'
const router = express.Router();
const authenticateUser = require('../middleware/auth');
import{
  viewCurrentUser,
  updateUser,
  updateUserPassword,
} from  '../service/index'


router.get('/showMe', authenticateUser, viewCurrentUser);
router.patch('/updateUser', authenticateUser, updateUser);
router.patch('/updateUserPassword',authenticateUser, updateUserPassword);



module.exports = router;