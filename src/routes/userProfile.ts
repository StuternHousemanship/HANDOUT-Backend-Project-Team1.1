import express from 'express'
const router = express.Router();
import {verifyToken} from "../middleware/auth"
import{
  CurrentUser,
 editUser,
editUserPassword
} from  '../Controllers/ProfileController/profile'


router.get('/getSingleUser/:id', verifyToken,  CurrentUser);
router.patch('/updateUser', verifyToken, editUser);
 router.patch('/updateUserPassword',verifyToken, editUserPassword);



export default router;