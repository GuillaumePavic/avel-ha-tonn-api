const createTransporter = require('./transporter');

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://avelhatonn.herokuapp.com/resetPassword' : 'http://localhost:3000/resetPassword';

async function sendResetPwdEmail(userEmail, token) {
    const transporter = createTransporter();

        // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.EMAIL_ADMIN,
        to: userEmail,
        subject: "Email verification",
        html: `<b>Bonjour, veuillez cliquer sur ce <a href="${BASE_URL}/${token}" >lien</> afin de réinitialiser votre mot de passe.</b>`, // html body
    });
}

module.exports = sendResetPwdEmail;