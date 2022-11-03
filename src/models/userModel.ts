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

//  userSchema.pre('save', async function () {
//     if (!this.isModified('password')) return
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//   })


  
  export const createJWT = function (user: any) {
   
    return jwt.sign({ firstName: user['firstName'], location: user['location'], lastName: user['lastName']},TOKEN_SECRET, {
      expiresIn: '2h',
    })
  
  }
  
  userSchema.methods['createJWT'] = createJWT;
  
  export const comparePassword = async function ( userPassword: string, canditatePassword: string) {
    
    const isMatch = await bcrypt.compareSync(canditatePassword, userPassword);
    return isMatch;
  };
  
  userSchema.methods['comparePassword'] = comparePassword;
  
const User = mongoose.model("user", userSchema);
export default User;
