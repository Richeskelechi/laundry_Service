const { validateAdminDetails, validateAdminLoginDetails } = require('../Validations/adminValidations')
const { adminExists, createAdmin, loginAdmin } = require('../DatabaseAPICalls/adminAPICalls');
const { successResponse, errorResponse } = require('../Response/CustomerResponse')

const createAdminService = async (req) => {
    try {
        const isValidAdminDetails = validateAdminDetails(req.body);
        if (isValidAdminDetails != true) {
            return errorResponse(400, isValidAdminDetails)
        } else {
            const accountExists = await adminExists(req.body.phoneNumber);
            if (accountExists == "exist") {
                return errorResponse(400, `Admin With This ${req.body.phoneNumber} Exist Already`)
            } else {
                const adminCreated = await createAdmin(req.body)
                if (adminCreated == true) {
                    return successResponse(201, "Admin Created Successfully")
                } else {
                    return errorResponse(400, adminCreated)
                }
            }
        }
    } catch (error) {
        return errorResponse(400, error.message)
    }
}

const loginAdminService = async (req) => {
    try {
        const isValidAdminDetails = validateAdminLoginDetails(req.body);
        if (isValidAdminDetails != true) {
            return errorResponse(400, isValidAdminDetails)
        }
        const isLoggedIn = await loginAdmin(req.body)
        if (isLoggedIn != false) {
            return successResponse(200, isLoggedIn)
        }
        return errorResponse(404, "Invalid Admin")
    } catch (error) {
        return errorResponse(400, error.message)
    }
}

module.exports = {
    createAdminService, loginAdminService
}