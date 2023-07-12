const express = require('express');
const customerRouter = express.Router();

const { verifyPhoneNumberController, verifyAndDeleteOTPController, createCustomerController, getCustomerDetailsController, checkCustomerExistController } = require('../Controllers/customerController')

customerRouter.post('/verifyPhoneNumber', verifyPhoneNumberController)
customerRouter.post('/verifyAndDeleteOTP', verifyAndDeleteOTPController)
customerRouter.post('/', createCustomerController)
customerRouter.get('/:id', getCustomerDetailsController)
customerRouter.get('/customerExist/:id', checkCustomerExistController)


module.exports = customerRouter