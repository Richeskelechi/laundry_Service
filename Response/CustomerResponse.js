const logger = require('../StartUp/logger');

async function successResponse(code, data) {
    logger.info(data)
    return { ok: true, statusCode: code, message: "Success", data: data }
}
async function errorResponse(code, data){
    logger.error(data)
    return { ok: false, statusCode: code, message: "Failure", data: data }
}

module.exports = {
    successResponse, errorResponse
}