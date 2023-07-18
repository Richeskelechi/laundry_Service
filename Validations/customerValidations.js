
function validatePhoneNumber(phoneNumber) {
    const PhoneNumberRegex = /^(\+?234|0)[\d]{10}$/;
    return PhoneNumberRegex.test(phoneNumber);
}

function validateOTPDetails(req){
    const codeRegex = /^\d{6}$/; // Matches a 6-digit number
    const PhoneNumberRegex = /^\+234[\d]{10}$/;
    if(codeRegex.test(req.code) === false){
        return 'The code Must be a 6 digit code'
    }else if(PhoneNumberRegex.test(req.phoneNumber) === false){
        return 'Invalid Phone Number. Phone Numbers Must Start With +234 And Have 10 More Digits'
    }else{
        return true
    }
}
function validateCustomerDetails(req){
    const emailRegex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const stringRegex = /^[A-Za-z]{3,50}$/;
    const addressRegex = /^[\w\d\s\S]{2,100}$/;
    const phoneNumberRegex = /^\+234[\d]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,100}$/

    if(!req.hasOwnProperty("firstName") || stringRegex.test(req.firstName) === false){
        return 'First Name Is Required And Must be a String of 2 to 50 characters'
    }else if(!req.hasOwnProperty("lastName") || stringRegex.test(req.lastName) === false){
        return 'Last Name Must be a String of 2 to 50 characters'
    }else if(phoneNumberRegex.test(req.phoneNumber) === false){
        return 'Invalid Phone Number. Phone Numbers Must Start With +234 And Have 10 More Digits'
    }else if(emailRegex.test(req.email) === false){
        return 'Invalid Email Address'
    }else if(!req.hasOwnProperty("country") || stringRegex.test(req.country) === false){
        return 'Country Must be a String of 2 to 50 characters'
    }else if(!req.hasOwnProperty("state") || stringRegex.test(req.state) === false){
        return 'State Must be a String of 2 to 50 characters'
    }else if(!req.hasOwnProperty("address") || addressRegex.test(req.address) === false){
        return 'Address Must be a String of 2 to 100 characters'
    }else if (typeof req.customerLocation !== "object" || req.customerLocation === null) {
        return 'Customer Location Is required And Must be an Object';
    }else if (!req.customerLocation.hasOwnProperty("lat") || !req.customerLocation.hasOwnProperty("lng")) {
        return 'Customer Location Must Have Lat And Lng Coordinates';
    }else if (typeof req.customerLocation.lat !== "number" || typeof req.customerLocation.lng !== "number") {
      return "Both The Lat And Lng Coordinates Must Be Numbers";
    }else if (req.customerLocation.lat < -90 || req.customerLocation.lat > 90 ||
        req.customerLocation.lng < -180 || req.customerLocation.lng > 180) {
      return "Invalid Lat Or Lng Coordinates";
    }else if(!req.hasOwnProperty("password") || passwordRegex.test(req.password) === false){
        return 'Password Must Be At Least 8 Characters And Must Contain One Uppercase Letter, One Lowercase Letter, One Number And One Special Character'
    }else if(!req.hasOwnProperty("confirmPassword") || req.password != req.confirmPassword){
        return 'Passwords Do Not Match'
    }else{
        return true
    }
}

function validateCustomerLoginDetails(req){
    const emailRegex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const phoneNumberRegex = /^\+234[\d]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,100}$/

    if (req.hasOwnProperty("emailPhoneNumber") === false) {
        return 'Please Provide A Phone Number Or Email Address';
    }else if (!(phoneNumberRegex.test(req.emailPhoneNumber) || emailRegex.test(req.emailPhoneNumber))) {
        return 'Invalid Phone Number Or Email Address Format.';
    }else if(passwordRegex.test(req.password) === false){
        return 'Password Must Be At Least 8 Characters And Must Contain One Uppercase Letter, One Lowercase Letter, One Number And One Special Character'
    }else{
        return true
    }
}

function validateCustomerTokenDetails(req){
    const phoneNumberRegex = /^\+234[\d]{10}$/;
    const tokenRegex = /[a-zA-Z0-9]/;

    if (phoneNumberRegex.test((req.phoneNumber)) === false) {
        return 'Invalid Phone Number Format.';
    }else if(tokenRegex.test(req.deviceToken) === false){
        return 'Invalid Device Token';
    }else{
        return true
    }
}

module.exports = {
    validatePhoneNumber, validateOTPDetails, validateCustomerDetails, validateCustomerLoginDetails, validateCustomerTokenDetails
}