import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { generateCode } from "../../services/generateCode";
import bcrypt from "bcrypt";
import { AuthRepository } from "../../repository/Auth";
import jwt from "jsonwebtoken";
import { sendVerificationMail, sendForgotpassword } from "../sendGrid";
import UserType from "../../interfaces/userType";
import { digitalCode } from "../digitalCode";
import { tokens } from "../../models/tokenModel";
import schema, { passwordError } from "../../middleware/passwordValidator";
import User from "../../models/userModel"

dotenv.config();

const TOKEN_SECRET = String(process.env.TOKEN_SECRET);
new AuthRepository();

export const createUserService = async (req: Request, res: Response) => {
  const code = generateCode();

  const passwordValidate = schema.validate(req.body.password);
  if (!passwordValidate) return res.status(400).json(passwordError);

  const newUser: UserType = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    password: bcrypt.hashSync(req.body.password, 8),
    active: false,
    verificationCode: code,
  };
  const isUserExist = await new AuthRepository().checkUserExist(req.body.email);
  if (isUserExist) return res.status(400).json("User already exists");

  try {
    const user = await new AuthRepository().createUser(newUser);
    await sendVerificationMail(
      newUser.firstName,
      newUser.email,
      newUser.verificationCode
    );
    return user;
  } catch (error) {
    res.status(400).json(error);
  }
};

export const verifyEmailService = async (req: Request, res: Response) => {
  const user = await new AuthRepository().createUserEmail(
    req.params.verificationCode
  );
  if (!user) return res.status(404).send({ message: "User Not found." });
  try {
    user.active = true;
    await new AuthRepository().createUser(user);
    return user;
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginService = async (req: Request, res: Response) => {
  const user = await new AuthRepository().loginUser(req.body.email);

  if (!user) return res.status(404).json({ message: "User Not found." });

  const hashedPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!hashedPassword) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    const token = jwt.sign({ user }, TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("handout_token", token);
    return token;
  } catch (error) {
    res.status(400).json(error);
  }
};

export const forgotPasswordService = async (req: Request, res: Response) => {
  const code = digitalCode();

  try {
    const user = await new AuthRepository().forgotpassword(req.body.email);
    if (!user) return res.status(400).json({ message: "Email not found" });
   
    let token = await new AuthRepository().userID(user._id);
    if (!token) {
      token = await new tokens({
        userId: user._id,
        token: code,
      }).save();
    }
   
    const link =  `${process.env.BASE_URL}/passwordReset?token=${user._id}/${token.token}`
    await sendForgotpassword("User", req.body.email, link);
  } catch (err) {
    return err;
  }
};

export const resetpasswordService = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.userId)

  if(!user) return res.status(404).json({message: "Invalid or expired password token"})

  const token = await tokens.findOne({
    userId: user._id,
    token: req.params.token
  })

  if(!token)
  return res.json({
    status: 400,
    error: "invalid code or expired"
  })

  user.password = bcrypt.hashSync(req.body.password, 10)
  await user.save()
  await token.delete()
}


export const logoutService = async (req: Request, res: Response) => {
    const logout = await res.clearCookie("token");
  
    if (!logout) {
      return res.status(400).json({
        status: "error",
      });
    } else {
      return logout;
    }
  };