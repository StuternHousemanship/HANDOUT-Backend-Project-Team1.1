import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { generateCode } from "../../services/generateCode";
import bcrypt from "bcrypt";
import { AuthRepository } from "../../Repository/Auth";
import User from "../../models/userModel";
import { findUser } from "../../services/userExists";
import { sendConfirmEMail } from "../../services/nodemailerEmail";
import { verifyPassword } from "../../services/verifyPassword";
import jwt from "jsonwebtoken";

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

    await auth.createUser(newUser);
    sendConfirmEMail(
        newUser.firstName,
        newUser.email,
        newUser.verificationCode
    );
    return res.status(201).json(newUser);
};

export const verifyEmailService = async (req: Request, res: Response) => {
    const user = await findUser(
        "verificationCode",
        req.body.verificationCode
    );
    if (!user) return res.status(404).send({ message: "User Not found." });

    user.active = true;
    await auth.createUser(user);
    res.status(200).send("Email verified! Close this tab and login");
}

export const loginService = async (req: Request, res: Response) => {
    const user = await findUser(
        "verificationCode",
        req.params.verificationCode
    );
    if (!user) return res.status(404).send({ message: "User Not found." });

    const validPassword = await verifyPassword(
        req.body.password,
        user.password
    );

    if (!validPassword)
        return res.status(400).json({ error: "Invalid credentials" });

    if (!user.active) {
        return res.status(401).send({
            message: "Pending Account. Please Verify Your Email!",
        });
    }

    const token = jwt.sign(req.body, TOKEN_SECRET, {
        expiresIn: "2h",
    });
    res.cookie("handout_token", token);
    res.status(200).json({ message: "Login Succesful", token });
};
