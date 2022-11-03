import { Request, Response } from 'express';
import User from '../../models/userModel';
import { StatusCodes } from 'http-status-codes';
import { comparePassword} from "../../models/userModel";
import{ BadRequestError, NotFoundError, UnAuthenticatedError } from '../../errors';

const updateUserPassword = async (req:Request, res:Response) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new BadRequestError('Please provide both values');
    }
  
    const userId: string  = req.body.userId.userId;


    const user = await User.findOne({ _id: userId }).select('+password');
  
    const isPasswordCorrect = await comparePassword(user.password, oldPassword);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError ('Invalid Credentials');
    }
    user.password = newPassword;
  
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
  };

  export default updateUserPassword;