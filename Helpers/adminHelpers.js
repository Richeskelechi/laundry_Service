require('dotenv').config()
let jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_ADMIN

async function genAuthenticationToken(adminId, access){
    return jwt.sign({ adminId: adminId, adminAccess:access }, secret, { expiresIn: '5h' });
}

function returnedFormattedAdmin(admin, token){
    return {
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        firstName: admin.firstName,
        lastName: admin.lastName,
        adminId: admin.adminId,
        token: token
    }
}

module.exports = {
    genAuthenticationToken, returnedFormattedAdmin
}