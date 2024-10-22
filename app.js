//Dependencies
const express = require('express');
const cors = require('cors');
const redis = require('redis');

//Configuration
const app = express();

//Redis Client default port is 6379
const redisClient = redis.createClient();

//Redis Error Handling
redisClient.on('error', (error) => {
    console.error(error);
});

//Middleware
app.use(cors());
app.use(express.json());

//Controllers
const signInController = require('./controllers/signInController');
const signUpController = require('./controllers/signUpController');
const moviesController = require('./controllers/moviesController');

//Routes
app.get('/', (request, response) => {
    response.send('Welcome to my red canary security challenge');
})

//Sending post request sends data in the body of the request which is more secure than 
//sending data in the URL
app.post('/sign-in', signInController);
app.post('/sign-up', signUpController);


app.get('/movies', moviesController.getMovies);
app.get('/movies/:title', moviesController.getOneMovieByTitle);

app.get('*', (request, response) => {
    response.status(404).send('Page not found again');
})

module.exports = app;


// // Dependencies
// const express = require('express');
// const cors = require('cors');
// const redis = require('redis');
// const OTPAuth = require('otpauth');
// const QRCode = require('qrcode');
// const crypto = require('crypto');
// const hiBase32 = require('hi-base32');

// // Configuration
// const app = express();

// // Redis Client default port is 6379
// const redisClient = redis.createClient();

// // Redis Error Handling
// redisClient.on('error', (error) => {
//     console.error(error);
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // In-memory user storage for demonstration (replace with your database)
// let users = [];

// // Function to generate a Base32 secret
// const generateBase32Secret = () => {
//     const buffer = crypto.randomBytes(15);
//     const base32 = hiBase32.encode(buffer).replace(/=/g, '').substring(0, 24);
//     return base32;
// };

// // Controllers
// const signInController = require('./controllers/signInController');
// const signUpController = require('./controllers/signUpController');
// const moviesController = require('./controllers/moviesController');

// // Routes
// app.get('/', (request, response) => {
//     response.send('Welcome to my red canary security challenge');
// });

// // Sending post request sends data in the body of the request which is more secure than 
// // sending data in the URL
// app.post('/sign-in', signInController);
// app.post('/sign-up', signUpController);
// app.get('/movies', moviesController.getMovies);
// app.get('/movies/:title', moviesController.getOneMovieByTitle);

// // Endpoint to enable two-factor authentication
// app.post('/enable-2fa', (req, res) => {
//     const { username } = req.body;

//     // Find the user by username (replace with your database lookup)
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//         return res.status(404).send('User not found');
//     }

//     // Generate a secret key for the user
//     const base32_secret = generateBase32Secret();
//     user.secret = base32_secret;

//     // Generate a QR code URL for the user to scan
//     let totp = new OTPAuth.TOTP({
//         issuer: 'YourSite.com', // Replace with your site name
//         label: user.username,
//         algorithm: 'SHA1',
//         digits: 6,
//         secret: base32_secret,
//     });

//     let otpauth_url = totp.toString();

//     // Generate and send the QR code as a response
//     QRCode.toDataURL(otpauth_url, (err, qrUrl) => {
//         if (err) {
//             return res.status(500).json({
//                 status: 'fail',
//                 message: 'Error while generating QR Code',
//             });
//         }
//         res.json({
//             status: 'success',
//             data: {
//                 qrCodeUrl: qrUrl,
//                 secret: base32_secret,
//             },
//         });
//     });
// });

// // Endpoint to verify the OTP
// app.post('/verify-2fa', (req, res) => {
//     const { username, token } = req.body;

//     // Find the user by username (replace with your database lookup)
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//         return res.status(404).send('User not found');
//     }

//     // Create a TOTP instance using the user's secret
//     let totp = new OTPAuth.TOTP({
//         secret: user.secret,
//         algorithm: 'SHA1',
//         digits: 6,
//     });

//     // Verify the token
//     const isValid = totp.validate({ token });

//     if (isValid) {
//         return res.json({ status: 'success', message: 'Token is valid!' });
//     } else {
//         return res.status(401).json({ status: 'fail', message: 'Invalid token' });
//     }
// });

// app.get('*', (request, response) => {
//     response.status(404).send('Page not found again');
// });

// module.exports = app;








// // Dependencies
// const express = require('express');
// const cors = require('cors');
// const redis = require('redis');
// const OTPAuth = require('otpauth');
// const QRCode = require('qrcode');
// const crypto = require('crypto');
// const hiBase32 = require('hi-base32');

// // Configuration
// const app = express();

// // Redis Client default port is 6379
// const redisClient = redis.createClient();

// // Redis Error Handling
// redisClient.on('error', (error) => {
//     console.error('Redis error:', error);
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // In-memory user storage for demonstration (replace with your database)
// let users = [];

// // Function to generate a Base32 secret
// const generateBase32Secret = () => {
//     const buffer = crypto.randomBytes(15);
//     const base32 = hiBase32.encode(buffer).replace(/=/g, '').substring(0, 24);
//     console.log('Generated Base32 secret:', base32);
//     return base32;
// };

// // Controllers
// const signInController = require('./controllers/signInController');
// const signUpController = require('./controllers/signUpController');
// const moviesController = require('./controllers/moviesController');

// // Routes
// app.get('/', (request, response) => {
//     console.log('Home route accessed');
//     response.send('Welcome to my red canary security challenge');
// });

// // Sending post request sends data in the body of the request which is more secure than 
// // sending data in the URL
// app.post('/sign-in', (req, res, next) => {
//     console.log('Sign-in request received:', req.body);
//     next();
// }, signInController);

// app.post('/sign-up', (req, res, next) => {
//     console.log('Sign-up request received:', req.body);
//     next();
// }, signUpController);

// app.get('/movies', (req, res) => {
//     console.log('Movies route accessed');
//     moviesController.getMovies(req, res);
// });

// app.get('/movies/:title', (req, res) => {
//     console.log('Fetching movie by title:', req.params.title);
//     moviesController.getOneMovieByTitle(req, res);
// });

// // Endpoint to enable two-factor authentication
// app.post('/enable-2fa', (req, res) => {
//     const { username } = req.body;
//     console.log('Enable 2FA request for user:', username);

//     // Find the user by username (replace with your database lookup)
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//         console.error('User not found:', username);
//         return res.status(404).send('User not found');
//     }

//     // Generate a secret key for the user
//     const base32_secret = generateBase32Secret();
//     user.secret = base32_secret;

//     // Generate a QR code URL for the user to scan
//     let totp = new OTPAuth.TOTP({
//         issuer: 'YourSite.com', // Replace with your site name
//         label: user.username,
//         algorithm: 'SHA1',
//         digits: 6,
//         secret: base32_secret,
//     });

//     let otpauth_url = totp.toString();
//     console.log('OTP Auth URL:', otpauth_url);

//     // Generate and send the QR code as a response
//     QRCode.toDataURL(otpauth_url, (err, qrUrl) => {
//         if (err) {
//             console.error('Error while generating QR Code:', err);
//             return res.status(500).json({
//                 status: 'fail',
//                 message: 'Error while generating QR Code',
//             });
//         }
//         console.log('QR Code generated successfully');
//         res.json({
//             status: 'success',
//             data: {
//                 qrCodeUrl: qrUrl,
//                 secret: base32_secret,
//             },
//         });
//     });
// });

// // Endpoint to verify the OTP
// app.post('/verify-2fa', (req, res) => {
//     const { username, token } = req.body;
//     console.log('Verifying 2FA for user:', username, 'with token:', token);

//     // Find the user by username (replace with your database lookup)
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//         console.error('User not found:', username);
//         return res.status(404).send('User not found');
//     }

//     // Create a TOTP instance using the user's secret
//     let totp = new OTPAuth.TOTP({
//         secret: user.secret,
//         algorithm: 'SHA1',
//         digits: 6,
//     });

//     // Verify the token
//     const isValid = totp.validate({ token });
//     console.log('Is the token valid?', isValid);

//     if (isValid) {
//         console.log('Token is valid for user:', username);
//         return res.json({ status: 'success', message: 'Token is valid!' });
//     } else {
//         console.error('Invalid token for user:', username);
//         return res.status(401).json({ status: 'fail', message: 'Invalid token' });
//     }
// });

// app.get('*', (request, response) => {
//     console.log('404 route accessed');
//     response.status(404).send('Page not found again');
// });

// module.exports = app;






































// // Dependencies
// const express = require('express');
// const cors = require('cors');
// const redis = require('redis');
// const nodemailer = require('nodemailer'); // Import nodemailer
// const speakeasy = require('speakeasy'); // Import speakeasy
// const QRCode = require('qrcode'); // Import QRCode
// const User = require('./models/userModels'); // Import your User model
// const signInController = require('./controllers/signInController'); // Import your sign-in controller
// const signUpController = require('./controllers/signUpController'); // Import your sign-up controller
// const moviesController = require('./controllers/moviesController'); // Import your movies controller


// // Configuration
// const app = express();


// // Redis Client default port is 6379
// const redisClient = redis.createClient();


// // Redis Error Handling
// redisClient.on('error', (error) => {
//    console.error(error);
// });


// // Middleware
// app.use(cors());
// app.use(express.json());


// // Create nodemailer transporter
// const transporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//    user: process.env.EMAIL_USER,
//    pass: process.env.EMAIL_PASS,
//  },
// });


// // Routes
// app.get('/', (request, response) => {
//    response.send('Welcome to my red canary security challenge');
// });


// // Sign-up route
// app.post('/sign-up', async (req, res) => {
//  const { username, password, email, phoneNumber } = req.body;


//  // Create user logic
//  const user = await User.create({ username, password, email, phoneNumber }); // Save user to the database


//  // Generate a 2FA secret
//  const secret = speakeasy.generateSecret();
//  user.secret = secret.base32; // Save the base32 secret in the user model
//  await user.save(); // Update the user in the database


//  // Generate QR code for the user to scan
//  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);


//  // Send QR code URL and success message
//  res.json({ qrCodeUrl, message: 'User registered successfully' });
// });


// // Sign-in route
// app.post('/sign-in', signInController);
// app.post('/sign-up', signUpController);


// // New route for sending backup codes
// app.post('/send-backup-codes', async (req, res) => {
//  const backupCodes = [...Array(10)].map(() => speakeasy.generateSecret({ length: 8 }).base32);


//  // Send backup codes via email
//  await transporter.sendMail({
//    from: process.env.EMAIL_USER,
//    to: req.body.email,
//    subject: 'Your Backup Codes',
//    text: `Your backup codes: ${backupCodes.join(', ')}`,
//  });


//  res.send('Backup codes sent to your email');
// });


// // Additional movie routes
// app.get('/movies', moviesController.getMovies);
// app.get('/movies/:title', moviesController.getOneMovieByTitle);


// // 404 route
// app.get('*', (request, response) => {
//    response.status(404).send('Page not found again');
// });


// // Export the app
// module.exports = app;



