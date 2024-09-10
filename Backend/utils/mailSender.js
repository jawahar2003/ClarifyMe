require("express-async-errors")


// utils/mailSender.js
const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
 
  // Create a Transporter to send emails
  let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  });
  // Send emails to users
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: title,
    html: body,
  });
  console.log("Email info: ", info);
  return info;
  
};
module.exports = mailSender;