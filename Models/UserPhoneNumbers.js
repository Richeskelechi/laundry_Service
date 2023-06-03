const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Phone Number OTP schema
const phoneNumberSchema = new Schema({
  phoneNumber:{
    type:String,
    unique:true,
    required:true
  },
  isVerified: {
    type: Boolean,
    required: true,
    default:false
  },
  isAccountCreated:{
    type:Boolean,
    required:true,
    default:false
  },
  expiration: {
    type: Date,
    required: true
  },
  firebaseToken: { 
    type: String, 
    default: "" 
},
},  { timestamps: true });

// Create the OTP model
const PhoneNumber = mongoose.model('UserPhoneNumber', phoneNumberSchema);

module.exports = PhoneNumber;
