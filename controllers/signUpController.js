'use strict';

const bcrypt = require('bcrypt');
const { User } = require('../models');

//Sign Up
async function signUp(request, response) {
    try {
        console.log('Received request:', request.body);
        
        const { username, email, password, dateOfBirth } = request.body;

        console.log('Incoming sign-up data:', { username, email, password, dateOfBirth });

        //Check to see if user exists
        const existingUser = await User.findOne({ where: { email } });

        if(existingUser) {
            return response.status(409).json({ error: 'User already exists' });
        }

        //Password hashed with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const user = await User.create({username, email, password: hashedPassword, dateOfBirth});

        response.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Sign Up Error:', error);
        response.status(500).json({ error: error.message });
    }
}

module.exports = signUp;