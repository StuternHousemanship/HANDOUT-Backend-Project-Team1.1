import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'

dotenv.config();

const TOKEN_SECRET = String(process.env.TOKEN_SECRET);

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"] ||
        req.cookies["handout_token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log(decoded);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
