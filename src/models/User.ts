import mongoose, { Schema} from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserType from '../interfaces/user'


const UserSchema =new  Schema<UserType>({
  firstName: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city',
  },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export const createJWT = function (user: any) {
 
  return jwt.sign({ userId: user['_id'], firstName: user['firstName'], location: user['location'], lastName: user['lastName']},'&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSg', {
    expiresIn: '1d',
  })

}

UserSchema.methods['createJWT'] = createJWT;

export const comparePassword = async function ( userPassword: string, canditatePassword: string) {
  
  const isMatch = await bcrypt.compare(canditatePassword, userPassword);
  return isMatch;
};

UserSchema.methods['comparePassword'] = comparePassword;

const User = mongoose.model('User', UserSchema)
export default User