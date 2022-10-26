import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendConfirmEMail } from "../services/nodemailerConfig";
import { generateCode } from "../services/generateCode";
import * as dotenv from "dotenv";
import { findUser } from "../services/userExists";



dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  const code = generateCode();

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    password: bcrypt.hashSync(req.body.password, 8),
    active: false,
    verificationCode: code,
  });

  const check = await findUser("email", newUser.email);
  if (check) return res.status(400).json("User already exists");

  await newUser.save();
  sendConfirmEMail(newUser.firstName, newUser.email, newUser.verificationCode);
  return res.status(201).json(newUser);
};

export const verifyUserEmail = async (req: Request, res: Response) => {
  const user = await findUser("verificationCode", req.params.verificationCode);
  if (!user) return res.status(404).send({ message: "User Not found." });

  user.active = true;
  await user.save();
  res.status(200).send("Email verified! Close this tab and login");
};


