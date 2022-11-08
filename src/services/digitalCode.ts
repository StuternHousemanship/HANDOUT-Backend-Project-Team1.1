export const digitalCode = () => {
    const numbers = "0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return code;
  };
  