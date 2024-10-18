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
       if(!user || !(await bcrypt.compare(password, user.password))) {
            return response.status(401).json({error: 'Invalid login credentials'});
       }

       //If user account is locked
       if(user.accountLocked) {
        const lockOutEnd = new Date(user.lastFailedLogin);
        lockOutEnd.setHours(lockOutEnd.getHours() + 6);

        if(new Date() < lockOutEnd) {
            const formattedLoginTime = lockOutEnd.toLocaleString();
            return response.status(403).json({error: `Account is locked, please try again at ${formattedLoginTime}`})
        } else {
            user.failedLoginAttempts = 0;
            user.accountLocked = false;
            await user.save();
         } 
       }

       //If passwords do not match
       if(!(await bcrypt.compare(password, user.password))) {
            user.failedLoginAttempts += 1;
            user.lastFailedLogin = new Date();
       }

       //Lock account if user inputs incorrect password 3 times
       if(user.failedLoginAttempts >= 3) {
        user.accountLocked = true;
        await user.save();
        return response.status(403).json({error: 'Account is locked due to too many failed attempts. Try again later.'})
       }

       //If login attempt is successful, reset last failed login
       user.failedLoginAttempts = 0;
       await user.save();

       //If user exists and password matches generate token
       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

       response.status(200).json({ message: 'Sign in is a success', token });

    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

module.exports = signIn;
    

