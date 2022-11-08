import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import  { viewCurrentUser, updateUser, updateUserPassword} from "../../services/profile";


export const CurrentUser = async (req:Request, res: Response) => {
 const user= await viewCurrentUser(req, res);
 res.status(StatusCodes.OK).json(user)
}

export const editUser = async (req: Request, res: Response) => {
 const editedProfile = await updateUser(req, res);
  res.status(StatusCodes.OK).json(editedProfile);  
}


export const editUserPassword = async (req: Request, res: Response) => {
 await updateUserPassword(req, res);
  res.status(StatusCodes.OK).json({msg: 'Success! Password Updated.'});  
}