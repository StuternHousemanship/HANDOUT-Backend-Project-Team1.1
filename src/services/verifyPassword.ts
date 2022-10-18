import bcrypt from "bcrypt";

export const verifyPassword = async (
    formPassowrd: string,
    dbPassword: string
) => {
    const check = await bcrypt.compare(formPassowrd, dbPassword);
    return check;
};
