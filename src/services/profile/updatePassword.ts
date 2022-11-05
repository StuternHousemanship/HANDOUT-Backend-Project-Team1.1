import { Request, Response } from 'express';
import bcrypt from "bcrypt"
import{ BadRequestError, NotFoundError, UnAuthenticatedError } from '../../errors';

import { AuthRepository } from '../../Repository/Auth';
new AuthRepository();

const updateUserPassword = async (req:Request, res:Response) => {
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      throw new BadRequestError('Please provide both values');
    }

    const user = await new AuthRepository().editedPassword(req.body.authUser.user._id);
  
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
  