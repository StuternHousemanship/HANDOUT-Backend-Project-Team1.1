import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";

dotenv.config();

const SENDGRIDKEY = String(process.env.SENDGRID_KEY);

sgMail.setApiKey(SENDGRIDKEY);

export const sendVerificationMail = async (
  name: string,
  email: string,
  verificationCode: string
) => {
  const msg = {
    to: email,
    from: "handout@beargaze.com",
    subject: "Welcome to Handout",
    text: `Verify your account`,
    html: `<h2>Hello ${name},</h2><p>Welcome to Handout!</p><p>Please verify your account using this code: <strong>${verificationCode}</strong></p>`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendForgotpassword = async (
  name: string,
  email: string,
  link: string
) => {
  const info = {
    to: email,
    from: "handout@beargaze.com",
    subject: "Password Reset Email",
    html: `
          <h2>Hello ${name}!</h2>
            <p>You requested to reset your password</p>
 
           <p>Fill in the link: <strong>${link}</strong></p>
            
            <p>This code will expire within 60 minutes.</p>
           
            <p>If you don't want to reset your credentials, just ignore this message and nothing will be changed.
            
            </p>
           

          </div>`,
  };

  try {
    await sgMail.send(info);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending mail");
    console.error(error);
  }
};
