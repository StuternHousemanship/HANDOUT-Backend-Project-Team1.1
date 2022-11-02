import { Request , Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { UnAuthenticatedError } from '../errors/index'
import {createJWT} from "../models/User"

UnAuthenticatedError
const auth = async (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, "&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSg")
    interface IUser {
      id: string;
      firstName: string;
      lastName: string;
      location: string;
  }
  let user: IUser[];
    req.user = { userId: payload, firstName:payload, location:payload, lastName:payload }

    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

export default auth
