import UserType from "../../interfaces/userType";
import User from "../../models/userModel";

export class AuthRepository {
    async createUser(user: UserType) {
        const newUser = new User(user);
        await newUser.save();
    }
}