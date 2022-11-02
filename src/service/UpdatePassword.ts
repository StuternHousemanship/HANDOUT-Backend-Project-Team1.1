import { Request, Response } from 'express';
import candidate from '../repository/users';
import { StatusCodes } from 'http-status-codes';
import { comparePassword} from "../models/User";
import{ BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index';

const updateUserPassword = async (req:Request, res:Response) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new BadRequestError('Please provide both values');
    }
  
    const userId: string  = req.user.userId.userId;


    const user = await candidate.findOne({ _id: userId }).select('+password');
  
    const isPasswordCorrect = await comparePassword(user.password, oldPassword);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError ('Invalid Credentials');
    }
    user.password = newPassword;
  
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
  };

  export default updateUserPassword;