import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

const viewCurrentUser = async (req:Request, res:Response) => {
    
    res.status(StatusCodes.OK).json({ user: req.body});
  };

  export default viewCurrentUser;