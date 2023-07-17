const { verifyPhoneNumberService, verifyAndDeleteOTPService, createCustomerService, getCustomerDetailService, checkCustomerExistService, loginCustomerService } = require('../Services/customerService')

const verifyPhoneNumberController = async (req, res) => {
    try {
        const response = await verifyPhoneNumberService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const verifyAndDeleteOTPController = async (req, res) => {
    try {
        const response = await verifyAndDeleteOTPService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createCustomerController = async (req, res) => {
    try {
        const response = await createCustomerService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getCustomerDetailsController = async (req, res) => {
    try {
        const response = await getCustomerDetailService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const checkCustomerExistController = async (req, res) => {
    try {
        const response = await checkCustomerExistService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const loginCustomerController = async (req, res) => {
    try {
        const response = await loginCustomerService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    verifyPhoneNumberController, verifyAndDeleteOTPController, createCustomerController, getCustomerDetailsController, checkCustomerExistController, loginCustomerController
}