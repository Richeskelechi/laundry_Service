const PhoneNumberOTP = require('../Models/PhoneNumberOTP')
async function savePhoneNumberOTP(phoneNumber, otp) {
    const expiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    const exist = await PhoneNumberOTP.findOne({ phoneNumber })
    if (exist) {
        const savedOTP = await PhoneNumberOTP.findOneAndUpdate({ _id: exist._id }, { otp: otp, expiration: expiration }, {
            new: true
        })
        return savedOTP
    } else {
        const newOTP = new PhoneNumberOTP({
            otp: otp,
            phoneNumber: phoneNumber,
            expiration: expiration
        });
        const savedOTP = await newOTP.save()
        return savedOTP
    }

}

async function deleteExpiredOTPS(now){
    let isdeleted = await PhoneNumberOTP.deleteMany({ expiration: { $lt: now } });
    return isdeleted
}

async function verifyAndDeleteOTP(phoneNumber, code){
    try {
        // Find the matching row in the database
        const existingNumber = await PhoneNumberOTP.findOne({ phoneNumber });
    
        if (!existingNumber) {
          // If no matching row is found, return an error message
          return 'Expired'
        }
        if(existingNumber.otp == code) {
            // Delete the matching row
            await PhoneNumberOTP.deleteOne({ phoneNumber });
            return 'Verified'
        }else{
            return 'Invalid'
        }
      } catch (error) {
        // Handle any errors that occurred during the process
        return error.message
      }
}
module.exports = {
    savePhoneNumberOTP, deleteExpiredOTPS, verifyAndDeleteOTP
}