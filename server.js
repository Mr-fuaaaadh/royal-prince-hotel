require('dotenv').config({ path: './.env' }); // <-- ensures correct file is loaded

const express = require("express");
const path = require("path");
const sendMailHandler = require("./api/send-mail");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from your project root
app.use(express.static(path.join(__dirname)));

// API route
app.post("/api/send-mail", sendMailHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "********" : "Not Set");
