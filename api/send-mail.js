const nodemailer = require("nodemailer");

module.exports = async function sendMailHandler(req, res) {
  if (req.method === "POST") {
    const { name, email, comments } = req.body;

    console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "********" : "Not Set");

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });



    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${comments}`
      });
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ message: "Error sending email", error: error.toString() });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
