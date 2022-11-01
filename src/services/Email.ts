import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import sgMail from '@sendgrid/mail'


dotenv.config();

const NODEMAILER_EMAIL = String(process.env.NODEMAILER_EMAIL);
const NODEMAILER_PASS = String(process.env.NODEMAILER_PASS);

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)


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

export const sendForgotpassword = async (
  name: string,
  email: string,
  digitalCode: string
) => {
    const info = {
      from: "handout@beargaze.com",
      to: email,
      subject: "Password Reset Email",
      html: `
          <h2>Hello ${name}!</h2>
            <p>You requested to reset your password</p>
 
            <p>Fill in the code: <strong>${digitalCode}</strong></p>
            
            <p>This code will expire within 6 minutes.</p>
           
            <p>If you don't want to reset your credentials, just ignore this message and nothing will be changed.
            
            </p>
           

          </div>`,
    }      
    
   try {
      await sgMail.send(info)
      console.log('Email sent successfully')
    } catch (error){
      console.error('Error sending mail')
      console.error(error)
    }
}




