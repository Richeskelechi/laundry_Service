const { verifyPhoneNumberService, verifyAndDeleteOTPService } = require('../Services/customerService')

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

module.exports = {
    verifyPhoneNumberController, verifyAndDeleteOTPController
}