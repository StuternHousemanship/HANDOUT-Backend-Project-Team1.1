import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import  { viewCurrentUser, updateUser, updateUserPassword} from "../../services/profile";


export const CurrentUser = async (req:Request, res: Response) => {
  await viewCurrentUser(req, res);
}

export const editUser = async (req: Request, res: Response) => {
  await updateUser(req, res);
  res.status(StatusCodes.OK);  
}


export const editUserPassword = async (req: Request, res: Response) => {
  await updateUserPassword(req, res);
  res.status(StatusCodes.OK);  
}