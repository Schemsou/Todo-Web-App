const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email) => {
  sgMail.send({
    to: email,
    from: "chemseddine.sediri@gmail.com",
    subject: "WELCOME",
    text: "Welcome to your todo app",
  });
};

module.exports = {
  sendWelcomeEmail,
};
