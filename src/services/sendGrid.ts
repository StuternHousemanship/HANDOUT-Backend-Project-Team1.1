import sgMail from "@sendgrid/mail";

// to-do: move api key to .env
sgMail.setApiKey(
    "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"
);

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
