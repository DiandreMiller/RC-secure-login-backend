const crypto = require('crypto');

const getNewChallenge = () => {
    const challengeBuffer = crypto.randomBytes(32);
    return challengeBuffer.toString('base64url');
}


const convertChallenge = (challenge) => {
    return new TextEncoder().encode(challenge);
};

//Just in case it doesn't work:
// const convertChallengeToBase64 = (challenge) => {
//     const byteArray = new TextEncoder().encode(challenge);
//     return btoa(String.fromCharCode(...byteArray));
// };

module.exports = {
    getNewChallenge,
    convertChallenge,
};