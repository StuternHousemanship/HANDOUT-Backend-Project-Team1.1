import { Request, Response } from "express";
import { createUserService, loginService, verifyEmailService, resetPasswordService, forgotPasswordService } from "../../services/Auth";




export const create = async (req: Request, res: Response) => {
    await createUserService(req, res);
}

export const verifyUserEmail = async (req: Request, res: Response) => {
    await verifyEmailService(req, res);
};

export const authenticate = async (req: Request, res: Response) => {
    await loginService(req, res);
};
export const forgotPass = async (req: Request, res: Response) => {
    await forgotPasswordService(req, res);
};
export const resetPass = async (req: Request, res: Response) => {
    await resetPasswordService(req, res);
};

