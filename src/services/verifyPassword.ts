import bcrypt from "bcrypt";

export const verifyPassword = async (
  formPassowrd: string,
  dbPassword: string
) => {
  const check = bcrypt.compareSync(formPassowrd, dbPassword);
  return check;
};
