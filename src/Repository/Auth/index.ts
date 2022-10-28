import UserType from "../../Interfaces/userType";
import User from "../../Models/userModel";

export class AuthRepository {
    async createUser(user: UserType) {
        const newUser = new User(user);
        await newUser.save();
    }
}