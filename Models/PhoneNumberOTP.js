const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Phone Number OTP schema
const otpSchema = new Schema({
  otp: {
    type: String,
    required: true
  },
  phoneNumber:{
    type:String,
    unique:true,
    required:true
  },
  expiration: {
    type: Date,
    required: true
  }
});

// Create the OTP model
const PhoneNumberOTP = mongoose.model('OTP', otpSchema);

module.exports = PhoneNumberOTP;
