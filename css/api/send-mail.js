import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, comments } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.corusinfo.com", // Replace with your SMTP server
      port: 587,
      secure: false,
      auth: {
        user: "m.fuhad@corusinfo.com",
        pass: "Fuhad@2025"
      }
    });

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "m.fuhad@corusinfo.com",
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${comments}`
      });
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
