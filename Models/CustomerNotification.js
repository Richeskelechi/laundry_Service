const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Customer Notification schema
const customerNotificationSchema = new Schema({
    phoneNumber: String,
    title: { type: String, minLength: 1, maxLenght: 200 },
    message: { type: String, minLength: 1, maxLenght: 500 },
    status: { type: String, enum: ["success", "failed"] },
}, { timestamps: true });

// Create the OTP model
const CustomerNotification = mongoose.model('CustomerNotification', customerNotificationSchema);

module.exports = CustomerNotification;
