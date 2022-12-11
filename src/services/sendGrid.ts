import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
import BASE_URL from "../config";
import { template } from "../config/template/verifyEmail";
import {mail} from "../config/template/verifyPassword"

dotenv.config();

const SENDGRIDKEY = String(process.env.SENDGRID_KEY);
sgMail.setApiKey(SENDGRIDKEY);

export const sendVerificationMail = async (
  name: string,
  email: string,
  verificationCode: string
) => {
  const verifyEmailUrl = `${BASE_URL}/auth/confirm/${verificationCode}`;

  const msg = {
    to: email,
    from: "handout@beargaze.com",
    subject: "Welcome to Handout",
    text: `Verify your account`,
    html: template(name, verifyEmailUrl),
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
  digitalCode: string


) => {

  const verifyPasswordUrl = `${BASE_URL}passwordReset?token=${digitalCode}`
  const info = {
    to: email,
    from: "handout@beargaze.com",
    subject: "Password Reset Email",
    html: mail( name, verifyPasswordUrl)
  };

  try {
    await sgMail.send(info);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending mail");
    console.error(error);
  }
};
