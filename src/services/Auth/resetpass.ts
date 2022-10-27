import { Request, Response } from "express";
import dotenv from 'dotenv'
import joi from 'joi'
import {tokens} from '../../models/tokenModel'
import User from "../../models/userModel";
import {digitalCode} from '../digitalCode'
import {passwordResetEMail} from '../nodemailerConfig'

dotenv.config()

export const forgotPasswordService = async (req: Request, res: Response) => {

  const code = digitalCode()
  console.log(code)
    try {
      const result = joi.object({email: joi.string().email().required()})
      const { error } = result.validate(req.body)
      if (error)
      return res.json({
        status: 'error',
        error: 'Enter a valid email'
      })

      const user = await User.findOne({email: req.body.email})
      if(!user)
      return res.json({
        status: "error",
        error: "This email does not exist"
      })
  
      let token = await tokens.findOne({userId: user.id});
      if (!token) {
        token = await new tokens({
          userId: user.id,
          token: code
        }).save()
      }
      
      const link = `${process.env.CLIENT_URL}/resetPass/${user.id}/${token.token}`
      await passwordResetEMail("User", user.email, link)

      res.json({
        status: 200,
        success: "password reset link sent to your email account"
      })
      

    } catch (err) {
      console.log(err)
    }
}