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
