const createTransporter = require('./transporter');

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://avelhatonn-api.herokuapp.com' : 'http://localhost:5000';

async function sendVerificationEmail(userEmail, token) {
  const transporter = createTransporter();

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ADMIN,
    to: userEmail,
    subject: "Email verification",
    html: `<b>Bonjour, veuillez cliquer sur ce <a href="${BASE_URL}/auth/confirmEmail/${token}" >lien</> afin de finaliser votre inscription.</b>`, // html body
  });
}

module.exports = sendVerificationEmail;