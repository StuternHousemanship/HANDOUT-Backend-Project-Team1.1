import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { generateCode } from "../../services/generateCode";
import bcrypt from "bcrypt";
import { AuthRepository } from "../../Repository/Auth";
import User from "../../models/userModel";
import { findUser } from "../userExists";

import jwt from "jsonwebtoken";
import { sendVerificationMail } from "../sendGrid";

dotenv.config();

const TOKEN_SECRET = String(process.env.TOKEN_SECRET);
const auth = new AuthRepository();

export const createUserService = async (req: Request, res: Response) => {
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

    const isUserExist = await User.findOne({ email: newUser.email });
    if (isUserExist) return res.status(400).json("User already exists");

    try {
        await auth.createUser(newUser);
        await sendVerificationMail(
            newUser.firstName,
            newUser.email,
            newUser.verificationCode
        );
        return res
            .status(201)
            .json({
                message: "Check your email for confirmation code",
                newUser,
            });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const verifyEmailService = async (req: Request, res: Response) => {
    const user = await User.findOne({
        verificationCode: req.body.verificationCode,
    }).select('+verificationCode');
    if (!user) return res.status(404).send({ message: "User Not found." });

    user.active = true;
    await auth.createUser(user);
    res.status(200).send("Email verified! Close this tab and login");
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