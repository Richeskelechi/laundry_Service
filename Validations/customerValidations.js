
function validatePhoneNumber(phoneNumber) {
    const PhoneNumberRegex = /^(\+?234|0)[\d]{10}$/;
    return PhoneNumberRegex.test(phoneNumber);
}

function validateOTPDetails(req){
    const codeRegex = /^\d{6}$/; // Matches a 6-digit number
    const PhoneNumberRegex = /^(\+?234|0)[\d]{10}$/;
    if(codeRegex.test(req.code) === false){
        return 'The code Must be a 6 digit code'
    }else if(PhoneNumberRegex.test(req.phoneNumber) === false){
        return 'Invalid Phone Number. Phone Numbers Must Start With +234 And Have 10 More Digits'
    }else{
        return true
    }
}

module.exports = {
    validatePhoneNumber, validateOTPDetails
}