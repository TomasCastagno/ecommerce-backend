const nodemailer = require("nodemailer");
require("dotenv").config();

// creamos nuestro transportador

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: "587",
  secure: false,

  auth: {
    user: process.env.MAIL,
    pass: process.env.PRIVATE_KEY,
  },
});

module.exports = transporter;
