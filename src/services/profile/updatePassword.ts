import { Request, Response } from 'express';
import User from '../../models/userModel';
import { StatusCodes } from 'http-status-codes';
import bcrypt from "bcrypt"
import{ BadRequestError, NotFoundError, UnAuthenticatedError } from '../../errors';

const updateUserPassword = async (req:Request, res:Response) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new BadRequestError('Please provide both values');
    }
  
    const userId: string  = req.body.authUser.user._id;

    const user = await User.findOne({ _id: userId }).select('+password');
  
    const isPasswordCorrect = await comparePassword(user.password, oldPassword);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError ('Invalid Credentials');
    }
    user.password = bcrypt.hashSync(newPassword, 8);
  
    await user.save();
    user.password = ' '
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
  };

  

  const comparePassword = async function ( userPassword: string, canditatePassword: string) {
    const isMatch = await bcrypt.compareSync(canditatePassword, userPassword);
    return isMatch;
  };
  

  export default updateUserPassword;
  