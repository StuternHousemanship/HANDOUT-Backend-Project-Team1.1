import passwordValidator from "password-validator";
const schema = new passwordValidator();

export const passwordError =
  "Password must be atleast 8 characters, and have at least 1 uppercase, 1 lowercase, 1 digit, and should not contain spaces";

export default schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();