import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
    const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 7; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }

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
            return res.status(400).json({
                message:
                    "This Email is already in use, please login to your account",
            });
        }
        newUser.save().then(user => {
            res.status(201).json(user)
        }).catch(error => {
            res.status(404).json(error);
        })
    } catch (error) {
        res.status(400).json(error);
    }
};


