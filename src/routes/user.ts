import express from 'express'
const router = express.Router();
import authenticateUser from '../middleware/auth';
import{
  CurrentUser,
  editUser,
  editUserPassword
} from  '../controller/user'


router.get('/showMe', authenticateUser, CurrentUser);
router.patch('/updateUser', authenticateUser, editUser);
router.patch('/updateUserPassword',authenticateUser, editUserPassword);



export default router;