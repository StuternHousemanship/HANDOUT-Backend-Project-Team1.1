import UserType from "../../interfaces/userType";
import User from "../../models/userModel";

export class AuthRepository {
    userId:string | undefined ;
    email: any;
    firstName: any;
    lastName: any;
    location: any;
    async createUser(user: UserType) {
        const newUser = new User(user);
        await newUser.save();
    }
}