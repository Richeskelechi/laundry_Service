const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Admin schema
const adminSchema = new Schema({
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
    adminId:{
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
    address: {
        type: String,
        required: true,
        trim: true
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    },
    adminAccess:{
        type: String,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'You Must Provide A Password'],
        minlength: [8, 'Password Must Be At Least 8 Characters'],
    }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
