'use strict';

const bcrypt = require('bcrypt');
const  User  = require('../models/userModels');
console.log('Imported User Model:', typeof User);


// Sign Up
async function signUp(request, response) {
    console.log('User Model:', User);
    try {
        console.log('Received request:', request.body);
        
        const { username, email, password, dateOfBirth, phoneNumber, webauthnid, webauthnpublickey, } = request.body;

        // console.log('Incoming sign-up data:', { username, email, dateOfBirth, phoneNumber, webauthnid, webauthnpublickey });

        // console.log('User Model:', User);

        // Check to see if user exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return response.status(409).json({ error: 'User already exists' });
        }

        // Password hashed with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Hashed Password:', hashedPassword);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
            phoneNumber,
            webauthnid, 
            webauthnpublickey,
            authCounter: 0
        });

        response.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Sign Up Error:', error);
        response.status(500).json({ error: error.message });
    }
}

module.exports = signUp;
