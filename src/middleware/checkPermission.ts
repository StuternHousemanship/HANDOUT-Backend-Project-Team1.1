import { Request,Response, NextFunction } from 'express'
import { UnAuthenticatedError } from '../errors/index'

const checkPermissions = (req:Request, res:Response, next:NextFunction) => {
  if (req.user ) {
    next()
  } else {
    res.status(401)
    throw new UnAuthenticatedError('Not authorized as an user')
  }
}

export default checkPermissions