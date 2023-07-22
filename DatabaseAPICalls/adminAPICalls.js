require('dotenv').config()
const Admin = require('../Models/Admin')
const { genAuthenticationToken, returnedFormattedAdmin } = require('../Helpers/adminHelpers')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const uniqueID = uuidv4();
const saltRounds = +(process.env.SALT_ROUND)

async function adminExists(detail) {
    try {
        if (detail.length < 1) {
            return "notExist"
        } else {
            const accountExist = await Admin.findOne({
                $or: [
                    { phoneNumber: detail },
                    { email: detail },
                    { adminId: detail }
                ]
            });
            if (accountExist) {
                return "exist"
            } else {
                return "notExist"
            }
        }
    } catch (error) {
        if (error.name === 'CastError') return "notExist"
        return "notExist"
    }
}

async function createAdmin(newAdmin) {
    try {
        newAdmin.adminId = uniqueID
        newAdmin.password = await bcrypt.hash(newAdmin.password, saltRounds);
        const accountCreated = await Admin.create(newAdmin);
        if (accountCreated) {
            return true; // Account creation was successful
        } else {
            return false; // Account creation failed
        }
    } catch (error) {
        return error.message
    }
}

async function loginAdmin(admin) {
    let adminDetail = admin.emailPhoneNumber
    try {
        const adminDetails = await Admin.findOne({
            $or: [
                { phoneNumber: adminDetail },
                { email: adminDetail },
            ]
        });
        if (adminDetails) {
            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(admin.password, adminDetails.password);
            if (isMatch) {
                const token = await genAuthenticationToken(adminDetails.adminId)
                
                await Admin.findOneAndUpdate({ phoneNumber: adminDetails.phoneNumber }, { isLoggedIn: true }, {
                    new: true
                })
                let returnedAdmin = returnedFormattedAdmin(adminDetails, token)
                return returnedAdmin
            } else {
                return false
            }
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

// async function getCustomerData(customer) {
//     try {
//         if (customer.length < 1) {
//             return null
//         } else {
//             const customerDetails = await Customer.findOne({
//                 $or: [
//                     { phoneNumber: customer },
//                     { email: customer },
//                     { customerId: customer },
//                 ]
//             });

//             return customerDetails
//         }
//     } catch (error) {
//         if (error.name === 'CastError') return null
//         return null
//     }

// }

module.exports = {
 adminExists, createAdmin, loginAdmin
}