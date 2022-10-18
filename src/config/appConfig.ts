export const generateCode = () => {
    const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }
    return code;
};

export const digitalCode = () => {
    const numbers =
        "0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return code;
};