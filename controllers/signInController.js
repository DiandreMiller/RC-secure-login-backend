const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

//Sign In

async function signIn(request, response) {

    try {
        const { email, password } = request.body;

        //Check if user exists
        const user = await User.findOne({ where: { email } });

        //If user does not exist or password does not match
       if(!user || await bcrypt.compare(password, user.password)) {
            return response.status(401).json({error: 'Invalid login credentials'});
       }

       //If user exists and password matches generate token
       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

         response.status(200).json({ message: 'Sign in is a success', token });

    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

module.exports = signIn;
    

