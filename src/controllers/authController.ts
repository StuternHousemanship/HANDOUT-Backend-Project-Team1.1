import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendConfirmEMail } from "../config/nodemailerConfig";
import { generateCode } from "../config/generateCode";
import * as dotenv from "dotenv";
import { findUser } from "../services/userExists";

dotenv.config();
const TOKEN_SECRET = String(process.env.TOKEN_SECRET);

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
    if (check) return res.status(400).json("User already exists, please login");

    await newUser.save();
    sendConfirmEMail(
        newUser.firstName,
        newUser.email,
        newUser.verificationCode
    );
    return res.status(201).json(newUser);
};

export const verifyUserEmail = async (req: Request, res: Response) => {
    const user = await findUser(
        "verificationCode",
        req.params.verificationCode
    );
    if (!user) return res.status(404).send({ message: "User Not found." });

    user.active = true;
    await user.save();
    res.status(200).send("Email verified! Close this tab and login");
};

export const authenticate = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });

        if (user) {
            const validPassword = await bcrypt.compare(
                body.password,
                user.password
            );
            if (validPassword) {
                if (!user.active) {
                    return res.status(401).send({
                        message: "Pending Account. Please Verify Your Email!",
                    });
                } 

                const token = jwt.sign({ body }, TOKEN_SECRET, {
                    expiresIn: "2h",
                });
                res.cookie("handout_token", token);
                res.status(200).json({ message: "Login Succesful", token });
            } else {
                res.status(400).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};