const nodemailer = require("nodemailer");

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://havelhatonn-api.herokuapp.com/' : 'http://localhost:5000';

// async..await is not allowed in global scope, must use a wrapper
async function sendVerificationEmail(userEmail, token) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADMIN,
      pass: process.env.PASSWORD_ADMIN,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL_ADMIN, // sender address
    to: userEmail, // list of receivers
    subject: "Email verification", // Subject line
    html: `<b>Bonjour, veuillez cliquer sur ce <a href="${BASE_URL}/auth/confirmEmail/${token}" >lien</> afin de finaliser votre inscription.</b>`, // html body
  });

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = sendVerificationEmail;