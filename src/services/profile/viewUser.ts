import { Request, Response } from "express";
import { AuthRepository } from "../../Repository/Auth";
new AuthRepository();

const viewCurrentUser = async (req: Request, _res: Response) => {
  const getuser = new AuthRepository().getUser(req.params.id);
  return getuser;
};

export default viewCurrentUser;
