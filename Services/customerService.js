const { validatePhoneNumber, validateOTPDetails } = require('../Validations/customerValidations')
const { generateOTP, sendOTP } = require('../Helpers/customerHelpers')
const { savePhoneNumberOTP, verifyAndDeleteOTP } = require('../DatabaseAPICalls/customerAPICalls');
const { successResponse, errorResponse} = require('../Response/CustomerResponse')

const verifyPhoneNumberService = async (req) => {
    try {
        const isValidPhoneNumber = validatePhoneNumber(req.body.phoneNumber);
        if (!isValidPhoneNumber) {
            return errorResponse(400, "Invalid Phone Number. Phone Numbers Must Start With +234 And Have 10 More Digits")
        } else {
            const otp = await generateOTP()
            const savedOTP = await savePhoneNumberOTP(req.body.phoneNumber, otp)
            if (savedOTP._id) {
                const isOTPSent = await sendOTP(req.body.phoneNumber, otp)
                if (isOTPSent) {
                    return successResponse(200, "Code sent to the provided Number. Also Note That Verification Code Expires In 5 minutes")
                } else {
                    return errorResponse(400, "Code Not sent to the provided Number. Please Check The Number And Try Again")
                }
            } else {
                return errorResponse(400, "otp Not Saved")
            }
        }
    } catch (error) {
        return errorResponse(400, error.message)
    }
}

const verifyAndDeleteOTPService = async(req) =>{
    try{
        const isValidOTPDetails = validateOTPDetails(req.body);
        if(isValidOTPDetails != true){
            return errorResponse(400, isValidOTPDetails)
        }else{
            const isVerified = await verifyAndDeleteOTP(req.body.phoneNumber, req.body.code)
            if(isVerified == 'Expired'){
                return errorResponse(400, "Expired OTP Code. Please generate a new OTP") 
            }else if(isVerified == 'Invalid'){
                return errorResponse(400, "Invalid OTP Code. Please Enter a valid OTP");
            }else{
                return successResponse(200, "Number Verified Successfully")
            }
        }
    }catch(error){
        return errorResponse(400, error.message)
    }
}

module.exports = {
    verifyPhoneNumberService, verifyAndDeleteOTPService
}