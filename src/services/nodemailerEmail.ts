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
            <p>Please confirm your email with this code: <strong>${verificationCode}</strong></p>
          </div>`,
    });
    console.log("Message sent: %s", info.messageId);
};
