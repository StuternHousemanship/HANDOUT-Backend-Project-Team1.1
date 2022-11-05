import { Request, Response } from 'express';
import User from '../../models/userModel';
import bcrypt from "bcrypt"
import{ BadRequestError, NotFoundError, UnAuthenticatedError } from '../../errors';

import { AuthRepository } from '../../Repository/Auth';
const auth = new AuthRepository();

const updateUserPassword = async (req:Request, res:Response) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new BadRequestError('Please provide both values');
    }
  
    const userId: string  = req.body.authUser.user._id;
console.log(userId);

    const user = await User.findOne({ _id: userId }).select('+password');
  
    const isPasswordCorrect = await comparePassword(user.password, oldPassword);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError ('Invalid Credentials');
    }
    user.password = bcrypt.hashSync(newPassword, 8);
  console.log(user.password);
  
    await user.save();
    user.password = ' '
  };

  

  const comparePassword = async function ( userPassword: string, canditatePassword: string) {
    const isMatch = await bcrypt.compareSync(canditatePassword, userPassword);
    return isMatch;
  };
  

 


  export default updateUserPassword;
  