const express = require('express');
const schedule = require('node-schedule');
const app = express();

const logger = require('./StartUp/logger');
const { deleteExpiredOTP } = require('./Jobs/customerJobs')
require("./startUp/cors")(app)
require("./startUp/allRoutes")(app);
require('dotenv').config()
const connectDB = require('./StartUp/connect')

// app.use('/api/v1', userRoutes)

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
module.exports = {
    app, server
}