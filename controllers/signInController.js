'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Sign In
async function signIn(request, response) {
    try {
        const { email, password } = request.body;
        console.log('Sign-in request received:', { email, password });

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        console.log('User found:', user);

        // If user does not exist
        if (!user) {
            console.error('Invalid login credentials for email:', email);
            return response.status(401).json({ error: 'Invalid login credentials' });
        }

        // If user account is locked
        if (user.accountLocked) {
            const lockOutEnd = new Date(user.lastFailedLogin);
            lockOutEnd.setHours(lockOutEnd.getHours() + 6);
            console.log('Account locked. Lockout ends at:', lockOutEnd.toLocaleString());

            if (new Date() < lockOutEnd) {
                const formattedLoginTime = lockOutEnd.toLocaleString();
                return response.status(403).json({ error: `Account is locked, please try again at ${formattedLoginTime}` });
            } else {
                // Reset account lock if the lockout period has passed
                user.failedLoginAttempts = 0;
                user.accountLocked = false;
                await user.save();
                console.log('Account unlocked, failed attempts reset.');
            }
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            user.failedLoginAttempts += 1;
            user.lastFailedLogin = new Date();
            await user.save(); 

            console.error('Incorrect password attempt for email:', email);

            // Lock account if user inputs incorrect password 3 times
            if (user.failedLoginAttempts >= 3) {
                user.accountLocked = true;
                await user.save();
                return response.status(403).json({ error: 'Account is locked due to too many failed attempts. Try again later.' });
            }

            return response.status(401).json({ error: 'Invalid login credentials' });
        }

        // If login attempt is successful, reset failed attempts
        user.failedLoginAttempts = 0;
        await user.save();
        console.log('User logged in successfully:', user.username);

        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        response.status(200).json({ message: 'Sign in is a success', token });

    } catch (error) {
        console.error('Error during sign-in:', error);
        response.status(500).json({ error: error.message });
    }
}

module.exports = signIn;



















// 'use strict';

// const express = require('express');
// const bcrypt = require('bcrypt');
// const OTPAuth = require('otpauth');
// const QRCode = require('qrcode');
// const crypto = require('crypto');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // In-memory user storage for demonstration
// const users = [];

// // Endpoint to register a new user
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const id = users.length + 1;

//     // Hash the user's password before storing
//     const hashedPassword = await bcrypt.hash(password, 10);
//     users.push({ id, username, password: hashedPassword, secret: null, failedLoginAttempts: 0, accountLocked: false, lastFailedLogin: null });
    
//     res.status(201).send({
//         status: "success",
//         message: "User created successfully"
//     });
// });

// // Endpoint to enable two-factor authentication
// app.post('/enable-2fa', (req, res) => {
//     const { username } = req.body;
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//         return res.status(404).send('User not found');
//     }

//     const base32_secret = generateBase32Secret();
//     user.secret = base32_secret;

//     let totp = new OTPAuth.TOTP({
//         issuer: "YourSite.com",
//         label: user.username,
//         algorithm: "SHA1",
//         digits: 6,
//         secret: base32_secret,
//     });

//     const otpauth_url = totp.toString();
    
//     // Generate and send the QR code as a response
//     QRCode.toDataURL(otpauth_url, (err, qrUrl) => {
//         if (err) {
//             return res.status(500).json({ status: 'fail', message: "Error while generating QR Code" });
//         }
//         res.json({
//             status: "success",
//             data: {
//                 qrCodeUrl: qrUrl,
//                 secret: base32_secret
//             }
//         });
//     });
// });

// // Generate a Base32 secret
// const generateBase32Secret = () => {
//     const buffer = crypto.randomBytes(15);
//     const base32 = buffer.toString('base32').replace(/=/g, "").substring(0, 24);
//     return base32;
// };

// // Endpoint to verify the two-factor authentication code
// app.post('/verify-2fa', (req, res) => {
//     const { username, token } = req.body;
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//         return res.status(404).send('User not found');
//     }

//     let totp = new OTPAuth.TOTP({
//         issuer: "YourSite.com",
//         label: user.username,
//         algorithm: "SHA1",
//         digits: 6,
//         secret: user.secret,
//     });

//     const isValid = totp.validate({ token });
//     if (isValid) {
//         res.json({
//             status: "success",
//             message: "Authentication successful"
//         });
//     } else {
//         res.status(401).json({
//             status: "fail",
//             message: "Authentication failed"
//         });
//     }
// });

// // Start the Express server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
