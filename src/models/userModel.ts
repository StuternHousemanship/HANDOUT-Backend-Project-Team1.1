import mongoose, { Schema } from "mongoose";
import UserType from "../interfaces/userType";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction } from "express";


const TOKEN_SECRET = String(process.env.TOKEN_SECRET);
const userSchema = new Schema<UserType>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: Number, required: true },
        password: { type: String, required: true},
        active: { type: Boolean, required: true },
        verificationCode: { type: String, required: true, unique: true, select:false },
        location: {type:String, trim: true, maxlength: 20, default: 'my city',}
    },
    { timestamps: true }
);

  
  
const User = mongoose.model("user", userSchema);
export default User;
