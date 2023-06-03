const PhoneNumberOTP = require('../Models/PhoneNumberOTP')
const UserPhoneNumber = require('../Models/UserPhoneNumbers')

async function verifyPhoneUser(phoneNumber) {
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
}

async function savePhoneNumberOTP(phoneNumber, otp) {
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

}

async function deleteExpiredOTPS(now) {
    let isdeleted = await PhoneNumberOTP.deleteMany({ expiration: { $lt: now } });
    return isdeleted
}

async function deleteUnverifiedNumbers(now) {
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
        }else{
            return "notExist"
        }
    } catch (error) {
        // Handle any errors that occurred during the process
        return error.message
    }
}

module.exports = {
    savePhoneNumberOTP, deleteExpiredOTPS, deleteUnverifiedNumbers, verifyAndDeleteOTP, verifyPhoneUser
}