// const { server } = require('@passwordless-id/webauthn'); 
const User = require('../models/userModels'); 
const webAuthn = require('@passwordless-id/webauthn');

// Register Passkey 
const crypto = require('crypto');

// Function to generate a random challenge
const generateChallenge = () => {
    return crypto.randomBytes(32).toString('base64'); 
};

exports.registerPasskey = async (request, response) => {

    try {
        const { userId } = request.body; 
        const user = await User.findByPk(userId);
        console.log('User:', user);
    
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
    
    
        const challenge = generateChallenge();
        user.challenge = challenge;
        await user.save();

        console.log("Generated Challenge (Backend):", challenge);
    
        // Define the relying party object
        const rp = {
            name: 'Red Canary', 
            id: process.env.EXPECTED_RPID, 
        };
    
    
         // Define acceptable public key credential parameters
         const pubKeyCredParams = [
            { type: 'public-key', alg: -7 },    
            { type: 'public-key', alg: -257 }   
        ];
    
        // Prepare the registration options
        const options = {
            rp,
            user: {
                id: Buffer.from(String(userId)).toString('base64'),
                name: String(user.email),
                displayName: String(user.username),
            },
            challenge, 
            pubKeyCredParams,
            attestation: 'direct',
            timeout: 60000,
        };
    
        // Send the options back to the frontend
        response.json(options);

    } catch (error) {
        console.error('Error registering passkey:', error.message);
        console.error('Error registering passkey:', error);

        response.status(500).json({ error: 'An error occurred during registration' });
    }
};

// Verify Passkey
exports.verifyPasskey = async (request, response) => {
    const { credential, email } = request.body;
    console.log('Incoming credential:', credential);
    console.log('Incoming email:', email);

    if (!email) {
        console.error('Email is missing in the request');
        return response.status(400).json({ error: 'Email is required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // Prepare the expected object for verification
        const expectedChallenge = user.challenge.replace(/=*$/, '').replace(/\+/g, '-').replace(/\//g, '_');
        const expected = {
            challenge: expectedChallenge, 
            origin: process.env.EXPECTED_ORIGIN, 
            rpid: process.env.EXPECTED_RPID, 
            userVerified: true, 
            counter: user.authCounter || 0, 
            domain: process.env.EXPECTED_DOMAIN || process.env.EXPECTED_RPID, 
            verbose: true 
        };
        console.log('Expected verification:', expected);

        try {
            // Use the server.verifyRegistration method for verifying
            const verifiedRegistration = await webAuthn.server.verifyRegistration(credential, expected);
            console.log('Verification successful:', verifiedRegistration);
    
            // Update user's authentication counter for the next verification
            user.authCounter = (user.authCounter || 0) + 1; 
    
            // Store webauthnid and public key in the user's record
            user.webauthnid = verifiedRegistration.credential.id; 
            user.webauthnpublickey = verifiedRegistration.credential.publicKey; 
            user.challenge = null; 
            await user.save();
    
            // Return success response with detailed information
            response.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.username,
                },
                credential: verifiedRegistration.credential,
                authenticator: verifiedRegistration.authenticator 
            });
        } catch (verificationError) {
            console.error('Verification failed:', verificationError);
            console.error('Expected challenge:', expected.challenge);
            console.error('Received clientDataJSON challenge:', credential.response.clientDataJSON);
            response.status(400).json({ error: 'Verification failed' });
        }

    } catch (error) {
        console.error('Error verifying passkey 01:', error.message);
        console.error('Error verifying passkey:', error);

        response.status(500).json({ error: 'Internal Server Error' });
    }  
};
