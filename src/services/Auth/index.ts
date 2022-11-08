import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { generateCode } from "../../services/generateCode";
import bcrypt from "bcrypt";
import { AuthRepository } from "../../Repository/Auth";
import jwt from "jsonwebtoken";
import { sendVerificationMail} from "../sendGrid";
import UserType from "../../interfaces/userType";



dotenv.config();

const TOKEN_SECRET = String(process.env.TOKEN_SECRET);
 new AuthRepository();

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
    const isUserExist = await new AuthRepository().checkUserExist (req.body.email);
    if (isUserExist) return res.status(400).json("User already exists");

    try {
        const user = await new AuthRepository().createUser(newUser);
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
    const user = await new AuthRepository().createUserEmail(req.body.verificationCode);
    if (!user) return res.status(404).send({ message: "User Not found." });
try {
   user.active = true;
    await new AuthRepository().createUser(user); 
    return user
} catch (error) {
    res.status(400).json(error)
}

};


export const loginService = async (req: Request, res: Response) => {
    
    const user = await new AuthRepository().loginUser(req.body.email);
    
    if (!user) return res.status(404).json({ message: "User Not found." });

    const hashedPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!hashedPassword) {
        return res.status(400).json({ error: "Invalid credentials" })
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
}


export const logoutService = async (req: Request, res: Response) => {
 
  const logout = res.clearCookie('token')
  if(!logout) {
    return res.status(400).json({
      status: 'error'
    })
  } else {
    res.redirect('/')
  }
}