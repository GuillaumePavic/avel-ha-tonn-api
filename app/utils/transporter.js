const nodemailer = require("nodemailer");

function createTransporter() {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ADMIN,
          pass: process.env.PASSWORD_ADMIN,
        },
      });

      return transporter;
}

module.exports = createTransporter;