const express = require('express');
const schedule = require('node-schedule');
const app = express();

const logger = require('./StartUp/logger');
const { deleteExpiredOTP, deleteUnverifiedPhoneNumbers } = require('./Jobs/customerJobs')
require("./startUp/cors")(app)
require("./startUp/allRoutes")(app);
require('dotenv').config()
const connectDB = require('./StartUp/connect')

const port = process.env.PORT || 7070;
let server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server = app.listen(port, () => {
            logger.info(`Listening on port ${port}... And Database Is Connected`)
            console.log(`Listening on port ${port}... And Database Is Connected`)
        })
    } catch (error) {
        console.log(error)
        logger.error(error)
    }
}
start()
// Start the scheduler to delete expired OTPs
schedule.scheduleJob('*/5 * * * *', deleteExpiredOTP); // Runs every 5 minute
// Start the scheduler to delete Unverified Phone Numbers
schedule.scheduleJob('0 2 * * *', deleteUnverifiedPhoneNumbers); // Runs every 2AM

module.exports = {
    app, server
}