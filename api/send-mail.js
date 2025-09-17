// /api/send-mail.js
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

module.exports = async function sendMailHandler(req, res) {
  if (req.method === 'POST') {
    const { name, email, comments } = req.body;

    const msg = {
      to: process.env.EMAIL_USER,   // നിങ്ങൾക്ക് കിട്ടാൻ ആഗ്രഹിക്കുന്ന ഇമെയിൽ
      from: process.env.EMAIL_USER, // **SendGrid-verified email**
      replyTo: email,               // ഫോമിൽ നൽകിയ യൂസർ ഇമെയിൽ
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${comments}`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully via SendGrid!' });
    } catch (error) {
      console.error('SendGrid error:', error.response?.body || error);
      res.status(500).json({ message: 'Error sending email via SendGrid', error: error.toString() });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
