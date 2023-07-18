require('dotenv').config()
var jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_ADMIN

async function genAuthenticationToken(adminId){
    return jwt.sign({ adminId: adminId }, secret, { expiresIn: '5h' });
}

module.exports = {
    genAuthenticationToken
}