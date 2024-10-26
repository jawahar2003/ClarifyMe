// models/otpModel.js
const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // UTC+5:30
      return new Date(now.getTime() + istOffset);
  },
  expires: 60 * 5,
},
});
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: <b>${otp}</b></p>`
    );
    //console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
module.exports = mongoose.model("OTP", otpSchema);