


import {Request, Response} from 'express'
import {forgotPasswordService} from '../services/Auth/resetpass'


export const forgotpass = async(req: Request, res: Response) => {
  await forgotPasswordService(req, res)
}