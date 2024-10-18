const bcrypt = require('bcrypt');
const { User } = require('../models');

//Sign Up
async function signUp(request, response) {
    try {
        const { username, email, password } = request.body;

        //Password hashed with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const user = await User.create({username, email, password: hashedPassword});

        response.status(201).json({ message: 'User created', user });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

module.exports = signUp;