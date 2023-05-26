const express = require('express');
const customerRouter = express.Router();

const { verifyPhoneNumberController, verifyAndDeleteOTPController } = require('../Controllers/customerController')

customerRouter.post('/verifyPhoneNumber', verifyPhoneNumberController)
customerRouter.post('/verifyAndDeleteOTP', verifyAndDeleteOTPController)

module.exports = customerRouter