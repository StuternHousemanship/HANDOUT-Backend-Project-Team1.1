import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendConfirmEMail } from "../config/nodemailerConfig";
import { generateCode } from "../config/appConfig";

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

    try {
        const emailCheck = await User.findOne({
            $or: [{ email: newUser.email }],
        });
        if (emailCheck) {
            return res.status(400).send({
                message:
                    "This Email is already in use, please login to your account",
            });
        }

        newUser
            .save()
            .then((user) => {
                sendConfirmEMail(
                    user.firstName,
                    user.email,
                    user.verificationCode
                );
                const message = "Check your email for confirmation!";
                res.status(201).json({ message, user });
            })
            .catch((error) => {
                res.status(404).json(error);
            });
    } catch (error) {
        res.status(400).send(error);
    }
};

export const verifyUserEmail = (req: Request, res: Response) => {
    User.findOne({
        verificationCode: req.params.verificationCode,
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            user.active = true;
            user.save((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                return res
                    .status(200)
                    .send("Email verified! Close this tab and login");
            });
        })
        .catch((e) => console.log("error", e));
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

                const token = jwt.sign({ body }, "token_secret", {
                    expiresIn: "2h",
                });
                // res.cookie("auth_token", token);
                res.status(200).json({ message: "Login Succesful", token });
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};
