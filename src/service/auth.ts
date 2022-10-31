import User from "../models/User"
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
  import { BadRequestError,UnAuthenticatedError } from "../errors";
import { comparePassword, createJWT } from "../models/User";
import { Schema } from "mongoose";
import UserType from "../interfaces/user";

const register = async (req:Request, res:Response) => {
  const { firstName, email, password } = req.body

  if (!firstName || !email || !password) {
    throw new BadRequestError('please provide all values')
  }
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }
  const user = await User.create({ firstName, email, password })

  const token = user.schema.methods['createJWT']
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      firstName: user.firstName,
    },
    token,
    location: user.location,
  })
}
const login = async (req:Request, res:Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await comparePassword (user.password, password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  const token = createJWT(user)
  user.password = ''
  
  res.status(StatusCodes.OK).json({ user, token : token, location: user.location })
}

module.exports = {
  register,
  login,
  
};