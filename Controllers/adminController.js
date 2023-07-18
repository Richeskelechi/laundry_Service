const { createAdminService, loginAdminService } = require('../Services/adminService')

const createAdminController = async (req, res) => {
    try {
        const response = await createAdminService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const loginAdminController = async (req, res) => {
    try {
        const response = await loginAdminService(req)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// const getAdminDetailsController = async (req, res) => {
//     try {
//         const response = await getAdminDetailService(req)
//         return res.status(response.statusCode).json(response)
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

// const checkAdminExistController = async (req, res) => {
//     try {
//         const response = await checkAdminExistService(req)
//         return res.status(response.statusCode).json(response)
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

module.exports = {
    createAdminController, loginAdminController
}