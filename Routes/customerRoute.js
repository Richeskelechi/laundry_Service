const express = require('express');
const customerRouter = express.Router();

const { verifyPhoneNumberController } = require('../Controllers/customerController')

customerRouter.post('/verifyPhoneNumber', verifyPhoneNumberController)

module.exports = customerRouter