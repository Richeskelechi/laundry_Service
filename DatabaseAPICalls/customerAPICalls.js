require('dotenv').config()
const PhoneNumberOTP = require('../Models/PhoneNumberOTP')
const UserPhoneNumber = require('../Models/UserPhoneNumbers')
const Customer = require('../Models/Customer')
const { genAuthenticationToken } = require('../Helpers/customerHelpers')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const uniqueID = uuidv4();
const saltRounds = +(process.env.SALT_ROUND)
async function verifyPhoneUser(phoneNumber) {
    try {
        const exist = await UserPhoneNumber.findOne({ phoneNumber });
        if (exist) {
            if (exist.isAccountCreated) {
                return "account Created"
            } else if (exist.isVerified) {
                return "account Verified"
            } else {
                return "account Unverified"
            }
        } else {
            const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
            const newUserNumber = new UserPhoneNumber({
                phoneNumber: phoneNumber,
                expiration: expiration
            });
            await newUserNumber.save()
            return 'new Account'
        }
    } catch (error) {
        return "error"
    }
}

async function savePhoneNumberOTP(phoneNumber, otp) {
    try {
        const expiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        const exist = await PhoneNumberOTP.findOne({ phoneNumber })
        if (exist) {
            const savedOTP = await PhoneNumberOTP.findOneAndUpdate({ _id: exist._id }, { otp: otp, expiration: expiration }, {
                new: true
            })
            return savedOTP
        } else {
            const newOTP = new PhoneNumberOTP({
                otp: otp,
                phoneNumber: phoneNumber,
                expiration: expiration
            });
            const savedOTP = await newOTP.save()
            return savedOTP
        }
    } catch (error) {
        return "error"
    }

}

async function deleteExpiredOTPS(now) {
    try {
        let isdeleted = await PhoneNumberOTP.deleteMany({ expiration: { $lt: now } });
        return isdeleted
    } catch (error) {
        return "error"
    }
}

async function deleteUnverifiedNumbers(now) {
    try {
        // Construct the query to find the records to be deleted
        const query = {
            $or: [
                { isAccountCreated: false },
                { isVerified: false }
            ],
            expiration: { $lte: now }
        };
        // Perform the deletion operation
        const deletionResult = await UserPhoneNumber.deleteMany(query);
        return deletionResult
    } catch (error) {
        return "error"
    }
}

async function verifyAndDeleteOTP(phoneNumber, code) {
    try {
        //Check if the phone number is verified already
        const verifiedNumber = await UserPhoneNumber.findOne({ phoneNumber })
        if (verifiedNumber) {
            if (verifiedNumber.isVerified) {
                return 'AlreadyVerified'
            } else {
                // Find the matching row in the database
                const existingNumber = await PhoneNumberOTP.findOne({ phoneNumber });

                if (!existingNumber) {
                    // If no matching row is found, return an error message
                    return 'Expired'
                }
                if (existingNumber.otp == code) {
                    // Delete the matching row
                    await PhoneNumberOTP.deleteOne({ phoneNumber });
                    await UserPhoneNumber.updateOne({ phoneNumber }, { $set: { isVerified: true } });
                    return 'Verified'
                } else {
                    return 'Invalid'
                }
            }
        } else {
            return "notExist"
        }
    } catch (error) {
        // Handle any errors that occurred during the process
        return error.message
    }
}

async function isNumberExist(phoneNumber) {
    try {
        const exist = await UserPhoneNumber.findOne({ phoneNumber });
        if (exist) {
            if (exist.isAccountCreated) {
                return "account Created"
            } else if (exist.isVerified) {
                return "account Verified"
            } else {
                return "account Unverified"
            }
        } else {
            return "notExist"
        }
    } catch (error) {
        return "notExist"
    }
}

async function customerExists(detail) {
    try {
        if (detail.length < 1) {
            return "notExist"
        } else {
            const accountExist = await Customer.findOne({
                $or: [
                    { phoneNumber: detail },
                    { email: detail },
                    { customerId: detail }
                ]
            });
            if (accountExist) {
                return "exist"
            } else {
                return "notExist"
            }
        }
    } catch (error) {
        if (error.name === 'CastError') return "notExist"
        return "notExist"
    }
}
async function createCustomer(newCustomer) {
    try {
        newCustomer.customerId = uniqueID
        newCustomer.password = await bcrypt.hash(newCustomer.password, saltRounds);
        let phoneNumber = newCustomer.phoneNumber
        const accountCreated = await Customer.create(newCustomer);
        if (accountCreated) {
            await UserPhoneNumber.updateOne(
                { phoneNumber },
                { $set: { customerId: newCustomer.customerId, isAccountCreated: true } }
            );
            return true; // Account creation was successful
        } else {
            return false; // Account creation failed
        }
    } catch (error) {
        return false
    }
}

async function getCustomerData(customer) {
    try {
        if (customer.length < 1) {
            return null
        } else {
            const customerDetails = await Customer.findOne({
                $or: [
                    { phoneNumber: customer },
                    { email: customer },
                    { customerId: customer },
                ]
            });

            return customerDetails
        }
    } catch (error) {
        if (error.name === 'CastError') return null
        return null
    }

}

async function loginCustomer(customer) {
    let customerDetail = customer.emailPhoneNumber
    try {
        const customerDetails = await Customer.findOne({
            $or: [
                { phoneNumber: customerDetail },
                { email: customerDetail },
            ]
        });
        if (customerDetails) {
            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(customer.password, customerDetails.password);
            if (isMatch) {
                const token = await genAuthenticationToken(customerDetails.customerId)
                let returnedCustomer = {
                    email: customerDetails.email,
                    phoneNumber: customerDetails.phoneNumber,
                    firstName: customerDetails.firstName,
                    lastName: customerDetails.lastName,
                    customerId: customerDetails.customerId,
                    token: token
                }
                await Customer.findOneAndUpdate({ phoneNumber: customerDetails.phoneNumber }, { isLoggedIn: true }, {
                    new: true
                })
                return returnedCustomer
            } else {
                return false
            }
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

async function saveDeviceToken(phoneNumber, deviceToken) {
    try {
        const savedToken = await UserPhoneNumber.findOneAndUpdate({ phoneNumber: phoneNumber }, { firebaseToken: deviceToken }, {
            new: true
        })
        if (savedToken) {
            return savedToken
        }else{
            return "error"
        }
    } catch (error) {
        return "error"
    }

}

module.exports = {
    savePhoneNumberOTP, deleteExpiredOTPS, deleteUnverifiedNumbers, verifyAndDeleteOTP, verifyPhoneUser, isNumberExist, customerExists, createCustomer, getCustomerData, loginCustomer, saveDeviceToken
}