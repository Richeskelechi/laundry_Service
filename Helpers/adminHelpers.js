require('dotenv').config()
var jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_ADMIN

async function genAuthenticationToken(adminId){
    return jwt.sign({ adminId: adminId }, secret, { expiresIn: '5h' });
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