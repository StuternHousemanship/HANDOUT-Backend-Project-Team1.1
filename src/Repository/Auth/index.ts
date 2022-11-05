import UserType from "../../interfaces/userType";
import User from "../../models/userModel";
import bcrypt from "bcrypt"

export class AuthRepository {
    async createUser(user: UserType) {
        const newUser = new User(user);
        return newUser.save();
    }

    public async checkUserExist (email:string): Promise<boolean>{
        const isUserExist = await User.findOne({ email});
        return !! isUserExist
    }
    public async createUserEmail (verificationCode:string): Promise<any>{
        const  user = await User.findOne({
            verificationCode}).select('+verificationCode');
            return  user
    }
    public async loginUser (email:string): Promise<any>{
        const  user = await User.findOne({email});
        if (!user) return null
            return  user
    }
    public async getUser (userId:string): Promise<any>{
      const user = await User.findById(userId)
      user.password= ' ';
       if (!user) return null
      return  user
    }
    public async userEdited (email:string): Promise<any>{
        const user = await User.findOne({email})
      user.password= ' ';
      user.password= ' ';
       if (!user) return null
      return  user
    }

    public async editedPassword(userId:string): Promise<any>{
        const user = await User.findById(userId).select('+password');
      return  user
    }
}










  // public async hashedPassword (password:string): Promise<any>{
    //     const  isPassword = bcrypt.compareSync(password, password);
    //         return !! isPassword
    // }
    // public async findUser (user:UserType): Promise<any>{
    //     const  getUser= await User.find({user});
    //         return !! getUser
    // }
   


