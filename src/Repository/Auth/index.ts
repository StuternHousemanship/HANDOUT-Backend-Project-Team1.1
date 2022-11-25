import UserType from "../../interfaces/userType";
import User from "../../models/userModel";

import { tokens } from "../../models/tokenModel";

export class AuthRepository {
  public async createUser(user: UserType) {
    const newUser = new User(user);
    return newUser.save();
  }

  public async checkUserExist(email: string): Promise<boolean> {
    const isUserExist = await User.findOne({ email });
    return !!isUserExist;
  }
  public async createUserEmail(verificationCode: string): Promise<any> {
    const user = await User.findOne({
      verificationCode,
    }).select("+verificationCode");
    return user;
  }
  public async loginUser(email: string): Promise<any> {
    const user = await User.findOne({ email });
    if (!user) return null;
    return user;
  }
  public async getUser(userId: string): Promise<any> {
    const user = await User.findById(userId);
    if (!user) return null;
    return user;
  }
  public async userEdited(email: string): Promise<any> {
    const user = await User.findOne({ email });

    user.password = " ";

    if (!user) return null;
    return user;
  }

  public async editedPassword(userId: string): Promise<any> {
    const user = await User.findById(userId).select("+password");
    return user;
  }

  public async forgotpassword(email: string): Promise<any> {
    const user = await User.findOne({ email });
    if (!user) return null;
    return user;
  }
  public async userID(userId: number): Promise<any> {
    const userOne = await tokens.findById(userId);
    if (!userOne) return null;
    return userOne;
  }
  public async findtokens(token: string): Promise<any> {
    const userOne = await tokens.findOne({ token });
    if (!userOne) return null;
    return userOne;
  }
}
