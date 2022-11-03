import { Request, Response } from "express";
import User from "../../models/userModel";
const { StatusCodes } = require('http-status-codes');

import { error } from "console";
import UserType from "../../interfaces/userType";

const TOKEN_SECRET = String(process.env.TOKEN_SECRET);


const updateUser = async (req:Request, res:Response) => {
    try {
        const userID = req.body.authUser.user._id
        const user = await User.findOne({_id: userID})
         partialUpdate(user, req.body)
       await user.save()
        user.password= ' ';
        res.json(user)
    } catch (error) {
        res.status(400).json(error);
    }
  };


  function partialUpdate(persitedUser:any,requestUser :any) {
    if (requestUser) {
     if (requestUser.firstName) {
       persitedUser.firstName = requestUser.firstName 
     } 
     if (requestUser.lastName) {
       persitedUser.lastName = requestUser.lastName 
     } 
     if (requestUser.mobile) {
       persitedUser.mobile = requestUser.mobile 
     } 
     if (requestUser.location) {
       persitedUser.location = requestUser.location
     } 

    }
  }

  
  export default updateUser;