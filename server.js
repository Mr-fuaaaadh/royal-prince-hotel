require('dotenv').config();
const express = require("express");
const path = require("path");
const sendMailHandler = require("./api/send-mail");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// API endpoint for sending email
app.post("/api/send-mail", sendMailHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
