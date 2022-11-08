import { Request, Response } from "express";
import {
  createUserService,
  loginService,
  verifyEmailService,
  resetpasswordService,
  logoutService,
  forgotPasswordService,
} from "../../services/Auth";

export const create = async (req: Request, res: Response) => {
  const newUser = await createUserService(req, res);
  return res.status(201).json({
    message: "Check your email for confirmation code",
    newUser,
  });
};

export const verifyUserEmail = async (req: Request, res: Response) => {
  await verifyEmailService(req, res);
  return res.status(200).send("Email verified! Close this tab and login");
};

export const authenticate = async (req: Request, res: Response) => {
  const token = await loginService(req, res);
  return res.status(200).json({ message: "Login Succesful", token });
};

export const logout = async (req: Request, res: Response) => {
  await logoutService(req, res);
  return res.status(200).json({ message: "logged out successfully" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  await forgotPasswordService(req, res);
  return res.status(200).json({ message: "Password reset mail has been sent" });
};
export const resetpassword = async (req: Request, res: Response) => {
  await resetpasswordService(req, res);
  return res.status(200).json({ message: "password updated successfully" });
};
