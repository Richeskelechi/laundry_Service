const logger = require('../StartUp/logger');
const { deleteExpiredOTPS } = require('../DatabaseAPICalls/customerAPICalls')

async function deleteExpiredOTP() {
    const now = new Date();
    try {
        const isDeleted = await deleteExpiredOTPS(now);
        if(isDeleted.acknowledged) {
            logger.info(`Expired OTPs deleted`)
        }else{
            logger.error(`Error deleting expired OTPs:`)
        }
    } catch (err) {
        logger.error(`Error deleting expired OTPs:`)
    }
}

module.exports = {
    deleteExpiredOTP
}