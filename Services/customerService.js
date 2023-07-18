const { validatePhoneNumber, validateOTPDetails, validateCustomerDetails, validateCustomerLoginDetails, validateCustomerTokenDetails } = require('../Validations/customerValidations')
const { generateOTP, sendOTP } = require('../Helpers/customerHelpers')
const { verifyPhoneUser, savePhoneNumberOTP, verifyAndDeleteOTP, isNumberExist, customerExists, createCustomer, getCustomerData, loginCustomer, saveDeviceToken } = require('../DatabaseAPICalls/customerAPICalls');
const { successResponse, errorResponse } = require('../Response/CustomerResponse')

const verifyPhoneNumberService = async (req) => {
    try {
        const isValidPhoneNumber = validatePhoneNumber(req.body.phoneNumber);
        if (!isValidPhoneNumber) {
            return errorResponse(400, "Invalid Phone Number. Phone Numbers Must Start With +234 And Have 10 More Digits")
        } else {
            const isVerifiedPhoneNumber = await verifyPhoneUser(req.body.phoneNumber)
            if (isVerifiedPhoneNumber == "account Created") {
                return successResponse(200, "account Created")
            } else if (isVerifiedPhoneNumber == "account Verified") {
                return successResponse(200, "create Account")
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
        }
    } catch (error) {
        return errorResponse(400, error.message)
    }
}

const verifyAndDeleteOTPService = async (req) => {
    try {
        const isValidOTPDetails = validateOTPDetails(req.body);
        if (isValidOTPDetails != true) {
            return errorResponse(400, isValidOTPDetails)
        } else {
            const isVerified = await verifyAndDeleteOTP(req.body.phoneNumber, req.body.code)
            if (isVerified == 'Expired') {
                return errorResponse(400, "Expired OTP Code. Please generate a new OTP")
            } else if (isVerified == 'Invalid') {
                return errorResponse(401, "Invalid OTP Code. Please Enter a valid OTP");
            } else if (isVerified == 'notExist') {
                return errorResponse(404, "Invalid User. User Does Not Exist");
            } else if (isVerified == 'AlreadyVerified') {
                return errorResponse(200, "User Already Verified");
            } else {
                return successResponse(201, "Number Verified Successfully")
            }
        }
    } catch (error) {
        return errorResponse(400, error.message)
    }
}

const createCustomerService = async (req) => {
    try {
        const isValidCustomerDetails = validateCustomerDetails(req.body);
        if (isValidCustomerDetails != true) {
            return errorResponse(400, isValidCustomerDetails)
        } else {
            const isVerifiedPhoneNumber = await isNumberExist(req.body.phoneNumber)
            if (isVerifiedPhoneNumber == "account Created") {
                return errorResponse(400, "Customer With This Number Exist Already")
            } else if (isVerifiedPhoneNumber == "account Unverified") {
                return errorResponse(400, "Phone Number Unverified, Please Verify Phone Number First")
            } else if (isVerifiedPhoneNumber == "notExist") {
                return errorResponse(404, "Invalid User. User With This Number Does Not Exist Already. Please Verify Phone Number First");
            } else {
                const accountExists = await customerExists(req.body.phoneNumber);
                if (accountExists == "exist") {
                    return errorResponse(400, "Customer With This Number Exist Already")
                } else {
                    const userCreated = await createCustomer(req.body)
                    if (userCreated) {
                        return successResponse(201, "Customer Created Successfully")
                    } else {
                        return errorResponse(400, "Customer Not Created")
                    }
                }
            }
        }
    } catch (error) {
        return errorResponse(400, error.message)
    }
}

const getCustomerDetailService = async (req) => {
    const id = req.params.id
    try {
        const userDetails = await getCustomerData(id)
        return successResponse(200, userDetails)
    } catch (error) {
        return errorResponse(400, error.message)
    }
}
const checkCustomerExistService = async (req) => {
    const id = req.params.id
    try {
        const accountExists = await customerExists(id);
        return successResponse(200, accountExists)
    } catch (error) {
        return errorResponse(400, error.message)
    }
}
const loginCustomerService = async (req) => {
    try {
        const isValidCustomerDetails = validateCustomerLoginDetails(req.body);
        if (isValidCustomerDetails != true) {
            return errorResponse(400, isValidCustomerDetails)
        }
        const isLoggedIn = await loginCustomer(req.body)
        if (isLoggedIn != false) {
            return successResponse(200, isLoggedIn)
        }
        return errorResponse(404, "Invalid User")
    } catch (error) {
        return errorResponse(400, error.message)
    }
}

const saveCustomerDeviceTokenService = async (req) => {
    try{
        const isValidToken = validateCustomerTokenDetails(req.body);
        if (isValidToken != true) {
            return errorResponse(400, isValidToken)
        }else{
            const savedToken = await saveDeviceToken(req.body.phoneNumber, req.body.deviceToken);
            if(savedToken == 'error'){
                return errorResponse(400, "Token Not Saved")
            }else{
                return successResponse(200, "Token Saved")
            }  
        }
    }catch (error) {
        return errorResponse(400, error.message)
    }
}


module.exports = {
    verifyPhoneNumberService, verifyAndDeleteOTPService, createCustomerService, getCustomerDetailService, checkCustomerExistService, loginCustomerService, saveCustomerDeviceTokenService
}