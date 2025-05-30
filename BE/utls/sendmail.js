const nodemailer = require('nodemailer');

async function sendMail({ to, subject, html }) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE == "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    try {
        const info = await transporter.sendMail({
            from: 'Dahn app - <tarndahn@email.com>',
            to,
            subject,
            html
        });

        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (err) {
        console.error('Error sending mail:', err);
        throw err;
    }
}
module.exports = sendMail