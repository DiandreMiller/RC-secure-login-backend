// test/testRelyingPartyName.js

const webauthn = require('@passwordless-id/webauthn');

// Example relying party object
const relyingParty = {
    id: 'localhost',
    name: 'Red Canary',
};

function testRelyingPartyName() {
    if (typeof relyingParty.name === 'string') {
        console.log(`relyingParty.name is a string: "${relyingParty.name}"`);
    } else {
        console.error(`Error: relyingParty.name is not a string, it is a ${typeof relyingParty.name}`);
    }
}

// Run the test
testRelyingPartyName();
