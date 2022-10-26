import { Request, Response } from "express";
import joi from 'joi'
import {tokens} from '../../models/tokenModel'
import User from "../../models/userModel";
import {digitalCode} from "../config/digitalCode"

export const forgotPassword = async (req: Request, res: Response) => {

  const code = digitalCode()
    try {
      const result = joi.object({email: joi.string().email().required()})
      const error = result.validate(req.body)
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
      

    } catch (err) {
      console.log(err)
    }
  }