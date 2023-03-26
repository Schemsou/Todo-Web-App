const sgMail = require("@sendgrid/mail");
const sendGridAPIKey =
  "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";

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email) => {
  sgMail.send({
    to: "chamsounounou7@gmail.com",
    from: "chamsounounou7@gmail.com",
    subject: "WELCOME",
    text: "Welcome to your todo app",
  });
};

module.exports = {
  sendWelcomeEmail,
};
