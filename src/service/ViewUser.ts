import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index';


const viewCurrentUser = async (req:Request, res:Response) => {
    res.status(StatusCodes.OK).json({ user: req.user });
  };


  export default viewCurrentUser;