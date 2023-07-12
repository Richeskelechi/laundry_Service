const express = require('express');
const customerRouter = express.Router();

const { verifyPhoneNumberController, verifyAndDeleteOTPController, createCustomerController } = require('../Controllers/customerController')

customerRouter.post('/verifyPhoneNumber', verifyPhoneNumberController)
customerRouter.post('/verifyAndDeleteOTP', verifyAndDeleteOTPController)
customerRouter.post('/customer', createCustomerController)

module.exports = customerRouter