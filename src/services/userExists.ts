import User from "../Models/userModel";

export const findUser = async (param: string, value: string) => {
    const user = await User.findOne({param: value});
    if (user) {
        return user;
    }
    return false;
}