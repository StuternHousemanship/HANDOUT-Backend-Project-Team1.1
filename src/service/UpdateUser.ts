import { Request, Response } from "express";
import User from "../models/User";
const { StatusCodes } = require('http-status-codes');
import { comparePassword, createJWT } from "../models/User";
const { BadRequestError, NotFoundError, UnAuthenticatedError } = require('../errors/index');


const updateUser = async (req:Request, res:Response) => {
    const { email, name, lastName, location} = req.body;
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId.userId});
  
    user.email = email;
    user.firstName = name;
    user.lastName = lastName;
    user.location = location;
   
    await user.save()
      
    const token =   createJWT(user)   
    res.status(StatusCodes.OK).json({ user, token, location: user.location });                                                                                                          
  };

  
  export default updateUser;