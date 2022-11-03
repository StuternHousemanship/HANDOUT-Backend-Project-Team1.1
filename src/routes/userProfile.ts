import express from 'express'
const router = express.Router();
import authenticateUser from "../middleware/profileAuth"
import{
  CurrentUser,
 editUser,
editUserPassword
} from  '../Controllers/ProfileController/profile'


router.get('/showMe', authenticateUser,   CurrentUser);
router.patch('/updateUser', authenticateUser, editUser);
 router.patch('/updateUserPassword',authenticateUser, editUserPassword);



export default router;