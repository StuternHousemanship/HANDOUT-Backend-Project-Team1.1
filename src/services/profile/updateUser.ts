import { Request, Response } from "express";
import User from "../../models/userModel";
const { StatusCodes } = require('http-status-codes');
import createJWT from "../../models/userModel";
import { BadRequestError } from '../../errors';
import jwt from "jsonwebtoken"
const TOKEN_SECRET = String(process.env.TOKEN_SECRET);


const updateUser = async (req:Request, res:Response) => {
    
    const { email, name, lastName, location} = req.body;
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values');
    }
    const user= await User.findOne({ _id: req.body.userId.userId});
  
   user.email = email;
    user.firstName = name;
    user.lastName = lastName;
    user.location = location;
   
    await user.save()
      
    try {
        const token = jwt.sign({ user }, TOKEN_SECRET, {
            expiresIn: "2h",
        });
        res.cookie("handout_token", token);
        res.status(200).json({ message: "Login Succesful", token });
    } catch (error) {
        res.status(400).json(error);
    }                                                                                                        
  };

  
  export default updateUser;