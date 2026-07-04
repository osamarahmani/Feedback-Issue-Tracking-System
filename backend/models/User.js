const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  points: {
    type: Number,
    default: 0
  },
  otp: String,
loginOtp: String,        // ✅ ADD
  loginOtpExpiry: Date     // ✅ ADD
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);