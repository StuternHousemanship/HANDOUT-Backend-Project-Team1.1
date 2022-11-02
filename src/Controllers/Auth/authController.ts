import { Request, Response } from "express";
import { createUserService, loginService, verifyEmailService, forgotPasswordService} from "../../services/Auth";




export const create = async (req: Request, res: Response) => {
    await createUserService(req, res);
}

export const verifyUserEmail = async (req: Request, res: Response) => {
    await verifyEmailService(req, res);
};

export const authenticate = async (req: Request, res: Response) => {
    await loginService(req, res);
};

export const forgotpass = async(req: Request, res: Response) => {
    await forgotPasswordService(req, res)
  }
