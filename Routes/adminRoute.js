const express = require('express');
const adminRouter = express.Router();

const { verifyAdminToken } = require('../Middlewares/verifyAdminToken');
const { createAdminController, loginAdminController } = require('../Controllers/adminController')

adminRouter.post('/', verifyAdminToken, createAdminController)
adminRouter.post('/adminLogin/', loginAdminController)
// adminRouter.get('/:id', getCustomerDetailsController)
// adminRouter.get('/customerExist/:id', checkCustomerExistController)


module.exports = adminRouter