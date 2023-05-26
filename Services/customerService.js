const { validatePhoneNumber } = require('../Validations/customerValidations')
const { generateOTP, sendOTP } = require('../Helpers/customerHelpers')
const { savePhoneNumberOTP } = require('../DatabaseAPICalls/customerAPICalls');
const logger = require('../StartUp/logger');


const verifyPhoneNumberService = async (req) => {
    try {
        const isValidPhoneNumber = validatePhoneNumber(req.body.phoneNumber);
        if (!isValidPhoneNumber) {
            return { ok: false, statusCode: 400, message: "Failure", data: "Invalid Phone Number. Phone Numbers Must Start With +234 And Have 10 More Digits" }
        } else {
            const otp = await generateOTP()
            const savedOTP = await savePhoneNumberOTP(req.body.phoneNumber, otp)
            if (savedOTP._id) {
                const isOTPSent = await sendOTP(req.body.phoneNumber, otp)
                if (isOTPSent) {
                    logger.info(`OTP saved And Sent Successfully`)
                    return { ok: true, statusCode: 200, message: "Success", data: "Code sent to the provided Number. Also Note That Verification Code Expires In 5 minutes" }
                } else {
                    logger.error(`OTP Not Saved Or Sent Successfully`)
                    return { ok: false, statusCode: 400, message: "Success", data: "Code Not sent to the provided Number. Please Check The Number And Try Again" }
                }
            } else {
                return { ok: false, statusCode: 400, message: "Failure", data: "otp Not Saved" }
            }

        }
    } catch (error) {
        return { ok: false, statusCode: 400, message: 'Failure', data: err.message
        }
    }
}

module.exports = {
    verifyPhoneNumberService
}