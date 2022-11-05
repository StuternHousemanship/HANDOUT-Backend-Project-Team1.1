import { Request, Response } from "express";
import { createUserService, loginService, verifyEmailService } from "../../services/Auth";



export const create = async (req: Request, res: Response) => {
    let newUser =  await createUserService(req, res);
    return res
    .status(201)
    .json({
        message: "Check your email for confirmation code",
        newUser,
    });
}

export const verifyUserEmail = async (req: Request, res: Response) => {
    await verifyEmailService(req, res);
  return  res.status(200).send("Email verified! Close this tab and login");
};

export const authenticate = async (req: Request, res: Response) => {
    await loginService(req, res);
    
};
