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
=======
    };
>>>>>>> bfb06b05db7866af83cfec0dec29b9b91d6de3b9
