const logger = require('../StartUp/logger');
const { deleteExpiredOTPS, deleteUnverifiedNumbers } = require('../DatabaseAPICalls/customerAPICalls')

async function deleteExpiredOTP() {
    const now = new Date();
    try {
        const isDeleted = await deleteExpiredOTPS(now);
        if (isDeleted.acknowledged) {
            logger.info(`Expired OTPs deleted`)
        } else {
            logger.error(`Error deleting expired OTPs:`)
        }
    } catch (err) {
        logger.error(`Error deleting expired OTPs:  ${err.message}`)
    }
}

async function deleteUnverifiedPhoneNumbers() {
    try {
        const currentDate = new Date();
        const isDeleted = await deleteUnverifiedNumbers(currentDate);
        if (isDeleted.acknowledged) {
            logger.info(`Deleted ${isDeleted.deletedCount} records.`)
        } else {
            logger.error(`Error deleting Unverified Phone Numbers:`)
        };
    } catch (error) {
        logger.error(`Error deleting Unverified Phone Numbers: ${error.message}`)
    }
}

module.exports = {
    deleteExpiredOTP, deleteUnverifiedPhoneNumbers
}