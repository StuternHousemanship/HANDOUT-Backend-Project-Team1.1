import { Request , Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { UnAuthenticatedError } from '../errors/index'


const TOKEN_SECRET = String(process.env.TOKEN_SECRET);

const auth = async (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
  const token = authHeader
  try {
    const payload = jwt.verify(token, TOKEN_SECRET)
console.log(payload);

    req.body = payload 
  
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

export default auth