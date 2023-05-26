
function validatePhoneNumber(phoneNumber) {
    const PhoneNumberRegex = /^(\+?234|0)[\d]{10}$/;
    return PhoneNumberRegex.test(phoneNumber);
}

module.exports = {
    validatePhoneNumber
}