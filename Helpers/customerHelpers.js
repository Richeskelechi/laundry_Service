require('dotenv').config()
const twilio = require('twilio');
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const ownNumber = process.env.SENDER_NUMBER
async function generateOTP() {
    const min = 100000; // Minimum value (inclusive)
    const max = 999999; // Maximum value (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function sendOTP(phoneNumber, otp){
    const client = twilio(accountSid, authToken);
    try {
        await client.messages.create({
          body: 'Below is your 6 digit Verification Code. Please This Verification Code Expires in 5 minutes. Your Verification Code is: '+ otp,
          from: ownNumber,
          to: phoneNumber
        });
        return true
      } catch (error) {
        return false;
      }
}

module.exports = {
    generateOTP, sendOTP
}