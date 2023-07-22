require('dotenv').config()
let jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_ADMIN
const { adminExists } = require('../DatabaseAPICalls/adminAPICalls');

async function verifyAdminToken(req, res, next) {
    // Get the token from the request header
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ ok: false, statusCode: 401, message: 'Failure', data: 'Not Authorized' });
    }

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, secret);

        // If the token is valid, the payload will be available in `decoded`
        // You can access token data using `decoded` in your routes or middleware
        const isValid = await adminExists(decoded.adminId)
        if(isValid == 'notExist') {
            return res.status(403).json({ ok: false, statusCode: 401, message: 'Failure', data: 'Invalid Token. Please Provide A Valid Token' });
        }else{
            req.user = decoded;
            console.log(req.user)
            next();
        }
    } catch (err) {
        // If the token is invalid or expired, catch the error
        return res.status(403).json({ ok: false, statusCode: 401, message: 'Failure', data: 'Invalid Token. Please Provide A Valid Token' });
    }
}

module.exports = {
    verifyAdminToken
}