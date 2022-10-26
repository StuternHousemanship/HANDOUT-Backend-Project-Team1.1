import User from "../models/userModel";

export const findUser = async (param: string, value: unknown) => {
  const user = await User.findOne({ param: value });
  return user;
};
