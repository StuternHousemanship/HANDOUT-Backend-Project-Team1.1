import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { generateCode } from "../../services/generateCode";
import bcrypt from "bcrypt";
import { AuthRepository } from "../../Repository/Auth";
import User from "../../models/userModel";

import jwt from "jsonwebtoken";
import { sendVerificationMail } from "../sendGrid";
import UserType from "../../interfaces/userType";

dotenv.config();

const TOKEN_SECRET = String(process.env.TOKEN_SECRET);
const auth = new AuthRepository();

export const createUserService = async (req: Request, res: Response) => {
    const code = generateCode();

    const newUser:UserType = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: bcrypt.hashSync(req.body.password, 8),
        active: false,
        verificationCode: code,
    };
    const isUserExist = await auth.checkUserExist (req.body.email);
    if (isUserExist) return res.status(400).json("User already exists");

    try {
        let user = await auth.createUser(newUser);
        await sendVerificationMail(
            newUser.firstName,
            newUser.email,
            newUser.verificationCode
        );
        return user
    } catch (error) {
        res.status(400).json(error);
    }
};

export const verifyEmailService = async (req: Request, res: Response) => {
    const user = await auth.createUserEmail(req.body.verificationCode);
    if (!user) return res.status(404).send({ message: "User Not found." });
try {
   user.active = true;
    await auth.createUser(user); 
    return user
} catch (error) {
    res.status(400).json(error)
}

};


export const loginService = async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User Not found." });

    const vp = bcrypt.compareSync(req.body.password, user.password);
    if (!vp) {
        return res.status(400).json({ error: "Invalid credentials" })
    }

    try {
        const token = jwt.sign({ user }, TOKEN_SECRET, {
            expiresIn: "2h",
        });
        res.cookie("handout_token", token);
        res.status(200).json({ message: "Login Succesful", token });
    } catch (error) {
        res.status(400).json(error);
    }
};