const express = require('express');
const customerRouter = express.Router();

const { verifyPhoneNumberController, verifyAndDeleteOTPController, createCustomerController, getCustomerDetailsController, checkCustomerExistController, loginCustomerController, saveCustomerDeviceTokenController } = require('../Controllers/customerController')

customerRouter.post('/verifyPhoneNumber', verifyPhoneNumberController)
customerRouter.post('/verifyAndDeleteOTP', verifyAndDeleteOTPController)
customerRouter.post('/', createCustomerController)
customerRouter.get('/:id', getCustomerDetailsController)
customerRouter.get('/customerExist/:id', checkCustomerExistController)
customerRouter.post('/customerLogin/', loginCustomerController)
customerRouter.post('/customerSaveToken/', saveCustomerDeviceTokenController)


module.exports = customerRouter