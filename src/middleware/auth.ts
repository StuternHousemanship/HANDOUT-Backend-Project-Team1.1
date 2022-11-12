import { NextFunction,  Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Logger } from "tslog";
import { Request } from "express-serve-static-core";

const log: Logger = new Logger({ name: "myLogger" });
declare module 'express-serve-static-core' {
  export interface Request {
    user: any
  }
}

dotenv.config();

const TOKEN_SECRET = String(process.env.TOKEN_SECRET);

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies["handout_token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    log.error(err);
    return res.status(401).send("Invalid Token");
  }
};
