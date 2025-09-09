const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, comments } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.royalprincehotels.com",
      port: 465,
      secure: true,
      auth: {
        user: "contact@royalprincehotels.com",
        pass: "Mubeer@123"
      }
    });

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "contact@royalprincehotels.com",
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${comments}`
      });
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Email sending error:", error);  // <-- Add this line
      res.status(500).json({ message: "Error sending email", error: error.toString() });
    }

  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
