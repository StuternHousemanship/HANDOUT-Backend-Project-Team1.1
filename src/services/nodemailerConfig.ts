import * as dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const NODEMAILER_EMAIL = String(process.env.NODEMAILER_EMAIL);
const NODEMAILER_PASS = String(process.env.NODEMAILER_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASS,
  },
});

export const sendConfirmEMail = async (
  name: string,
  email: string,
  verificationCode: string
) => {
  const info = await transporter.sendMail({
    from: '"Sadiq from Handout" <agssambo@gmail.com>',
    to: email,
    subject: "Handout Confirmation Email",
    html: `
          <h2>Hello ${name}!</h2>
            <p>Thank you for signing up to Handout.</p>
 
            <p style="text-align:center;margin-top:10px">Please confirm your email with this link: <a target="_blank" href="http://localhost:3000/auth/confirm/${verificationCode}"> Click here</a></p>

            <p>Please confirm your email with this link: <a target="_blank" href="http://localhost:3000/auth/confirm/${verificationCode}"> Click here</a></p>

          </div>`,
  });
  console.log("Message sent: %s", info.messageId);
};

export const passwordResetEMail = async (
  name: string,
  email: string,
  digitalCode: string
) => {
  const info = await transporter.sendMail({
    from: '"Sadiq from Handout" <agssambo@gmail.com>',
    to: email,
    subject: "Password Reset Email",
    html: `
          <h2>Hello ${name}!</h2>
            <p>You requested to reset your password</p>
 
            <p>Fill in the code${digitalCode}</p>
            
            <p>This link will expire within 6 minutes.</p>
           
            <p>If you don't want to reset your credentials, just ignore this message and nothing will be changed.
            
            </p>
           

          </div>`,
  });

  console.log("Message sent: %s", info.messageId);

}