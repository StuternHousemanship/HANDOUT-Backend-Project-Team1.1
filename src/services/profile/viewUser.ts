import { Request, Response } from "express";
import { AuthRepository } from "../../Repository/Auth";
const auth = new AuthRepository();

const viewCurrentUser = async (req:Request, _res:Response) => {
    const getuser = auth.getUser(req.params.id)
    return getuser;
  };

  export default viewCurrentUser;