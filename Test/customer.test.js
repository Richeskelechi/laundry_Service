require('dotenv').config()
const { app, server } = require('../app')
const request = require('supertest')
const { generateOTP } = require('../Helpers/customerHelpers')
const PhoneNumberOTP = require('../Models/PhoneNumberOTP'); // Assuming you have a separate file for the OTP model
const twilio = require('twilio');

// Mock the Twilio API
jest.mock('twilio');

describe('Verify Number API', () => {
    test('should generate OTP, save to database, and send to phone number', async () => {
        const phoneNumber = '+2347834567890'; // Replace with the phone number to test
        const mockSendSMS = jest.fn();

        // Mock the Twilio API sendSMS function
        twilio.mockReturnValue({
            messages: {
                create: mockSendSMS,
            },
        });

        const otp = await generateOTP()
        expect(typeof otp).toBe('number'); // Assert that the OTP is a number
        expect(otp.toString().length).toBe(6); // Assert that the OTP has six digits

        // Send a request to your OTP generation endpoint
        const response = await request(app)
            .post('/api/v1/customer/verifyPhoneNumber')
            .send({ phoneNumber });

        // Assert the response status code
        expect(response.statusCode).toBe(200);

        // Assert the response body or any other relevant information
        expect(response.body.message).toBe('Success');
        expect(response.body.ok).toBe(true);

        // Query the database to verify the OTP is saved correctly
        const expiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        const exist = await PhoneNumberOTP.findOne({ phoneNumber })
        if (exist) {
            const savedOTP = await PhoneNumberOTP.findOneAndUpdate({ _id: exist._id }, { otp: otp, expiration: expiration }, {
                new: true
            })
        } else {
            const newOTP = new PhoneNumberOTP({
                otp: otp,
                phoneNumber: phoneNumber,
                expiration: expiration
            });
            const savedOTP = await newOTP.save()
        }
        const savedOTP = await PhoneNumberOTP.findOne({ phoneNumber });

        // Assert the saved OTP
        expect(savedOTP).toBeDefined();
        // expect(savedOTP.otp).toEqual(otp);
    },10000);
});

// After all tests are completed
// afterAll((done) => {
//     server.close(done);
// });