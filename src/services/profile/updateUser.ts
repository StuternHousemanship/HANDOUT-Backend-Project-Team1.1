import { Request, Response } from "express";
import { AuthRepository } from "../../repository/Auth";
new AuthRepository();

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await new AuthRepository().userEdited(req.body.email);
    partialUpdate(user, req.body);
    await user.save();
    return user;
  } catch (error) {
    res.status(400).json(error);
  }
};

function partialUpdate(persitedUser: any, requestUser: any) {
  if (requestUser) {
    if (requestUser.firstName) {
      persitedUser.firstName = requestUser.firstName;
    }
    if (requestUser.lastName) {
      persitedUser.lastName = requestUser.lastName;
    }
    if (requestUser.mobile) {
      persitedUser.mobile = requestUser.mobile;
    }
    if (requestUser.location) {
      persitedUser.location = requestUser.location;
    }
  }
}

export default updateUser;
