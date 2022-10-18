import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { sendConfirmEMail } from "../config/nodemailerConfig";
import { generateCode } from "../config/appConfig";

export const createUser = async (req: Request, res: Response) => {
    const code  = generateCode();

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
                res.status(201).json({message, user});
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
                return res.status(200).send("Email verified! Close this tab and login");
            });
        })
        .catch((e) => console.log("error", e));
};
