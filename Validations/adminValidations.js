function validateAdminDetails(req){
    const emailRegex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const stringRegex = /^[A-Za-z]{3,50}$/;
    const addressRegex = /^[\w\d\s\S]{2,100}$/;
    const phoneNumberRegex = /^\+234[\d]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,100}$/

    if(!req.hasOwnProperty("firstName") || stringRegex.test(req.firstName) === false){
        return 'First Name Is Required And Must be a String of 2 to 50 characters'
    }else if(!req.hasOwnProperty("lastName") || stringRegex.test(req.lastName) === false){
        return 'Last Name Must be a String of 2 to 50 characters'
    }else if(!req.hasOwnProperty("phoneNumber") || phoneNumberRegex.test(req.phoneNumber) === false){
        return 'Invalid Phone Number. Phone Numbers Must Start With +234 And Have 10 More Digits'
    }else if(!req.hasOwnProperty("email") || emailRegex.test(req.email) === false){
        return 'Invalid Email Address'
    }else if(!req.hasOwnProperty("address") || addressRegex.test(req.address) === false){
        return 'Address Must be a String of 2 to 100 characters'
    }else if(!req.hasOwnProperty("adminAccess") || stringRegex.test(req.adminAccess) === false){
        return 'Admin Access Must be a String of 2 to 50 characters'
    }else if(!req.hasOwnProperty("password") || passwordRegex.test(req.password) === false){
        return 'Password Must Be At Least 8 Characters And Must Contain One Uppercase Letter, One Lowercase Letter, One Number And One Special Character'
    }else if(!req.hasOwnProperty("confirmPassword") || req.password != req.confirmPassword){
        return 'Passwords Do Not Match'
    }else{
        return true
    }
}

function validateAdminLoginDetails(req){
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

module.exports = {
    validateAdminDetails, validateAdminLoginDetails
}