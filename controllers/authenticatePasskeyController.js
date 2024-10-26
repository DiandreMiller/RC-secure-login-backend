'use strict';

const webauthn = require('@simplewebauthn/server');
const User = require('../models/userModels');
console.log('check', User);

exports.authenticatePasskey = async (request, response) => {
    const { credential } = request.body; 
    const user = await User.findByPk(credential.id); 
    console.log('User id:', user);

    if (!user) {
        return response.status(404).send('User not found');
    }

    // Verify the credential
    try {
        const verification = await webauthn.verifyAuthenticationResponse({
            credential,
            expectedChallenge: user.challenge, 
            expectedOrigin: process.env.EXPECTED_ORIGIN, 
            expectedRPID: process.env.EXPECTED_RPID, 
            publicKey: user.publicKey, 
        });

        if (verification.verified) {
            // Successful authentication
            response.status(200).send('Authentication successful');
        } else {
            // Authentication failed
            response.status(401).send('Authentication failed');
        }
    } catch (error) {
        console.error('Error verifying passkey:', error);
        response.status(500).send('Internal server error');
    }
};
