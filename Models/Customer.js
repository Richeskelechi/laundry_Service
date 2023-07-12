const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Customer schema
const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    customerId:{
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    address: {
        type: String,
    },
    customerLocation: { lat: Number, lng: Number },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    },
    expiration: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'You Must Provide A Password'],
        minlength: [8, 'Password Must Be At Least 8 Characters'],
    }
}, { timestamps: true });

// Create the OTP model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
