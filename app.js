// Dependencies
const express = require('express');
const cors = require('cors');
const redis = require('redis');



// Configuration
const app = express();

// Redis Client default port is 6379
const redisClient = redis.createClient();

// Redis Error Handling
redisClient.on('error', (error) => {
    console.error(error);
});

// Middleware
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


// Rate limiting
const limiter = require('./middlewares/rateLimiters'); 

// Validations
const signInValidation = require('./validations/userValidationsSignIn');
const signUpValidation = require('./validations/userValidationsSignUp');
// console.log('SignInValidation Type:', typeof signInValidation); 
// console.log('SignUpValidation Type:', signUpValidation()); 


// Controllers
const signInController = require('./controllers/signInController');
const signUpController = require('./controllers/signUpController');
const moviesController = require('./controllers/moviesController');
const passkeyController = require('./controllers/passkeyController');
const authenticatePasskeyController = require('./controllers/authenticatePasskeyController');
const challengeController = require('./controllers/challengeController');
const webauthnRoutes = require('./routes/webAuthnRoutes');


//Check incoming requests
app.use((request, res, next) => {
    console.log(`Incoming request: ${request.method} ${request.url}`);
    next();
});



// Routes
app.get('/', (request, response) => {
    response.send('Welcome to my red canary security challenge');
});

// Rate limiting and validation middleware to routes
// app.post('/sign-in', limiter, signInValidation, signInController);
app.post('/sign-in', async (request, response) => {
    console.log('Incoming request:', request.method, request.originalUrl);
    // console.log('Request Body:', request.body);

    // Validate the incoming request
    const { error } = signInValidation().validate(request.body); 
    if (error) {
        console.log('Validation Error:', error.details);
        return response.status(400).json({ message: error.details[0].message });
    }

    // Proceed to the controller if validation passes
    signInController(request, response);
});

// app.post('/sign-up', limiter, signUpController);
app.post('/sign-up',  async (request, response) => {
    console.log('Incoming request:', request.method, request.originalUrl);
    console.log('Request Body:', request.body);

    // Validate the incoming request
    const { error } = signUpValidation().validate(request.body);
    if (error) {
        console.log('Validation Error:', error.details);
        return response.status(400).json({ message: error.details[0].message });
    }

    await signUpController(request, response);
});


app.post('/register-passkey',  passkeyController.registerPasskey);
app.post('/verify-passkey',  passkeyController.verifyPasskey);
app.post('/authenticate-passkey',  authenticatePasskeyController.authenticatePasskey);


app.use('/api', webauthnRoutes);

app.get('/movies', moviesController.getMovies);
app.get('/movies/:title', moviesController.getOneMovieByTitle);
app.get('/generate-challenge',  challengeController);

app.get('*', (request, response) => {
    response.status(404).send('Page not found again');
});

// Error handling middleware
app.use((err, request, response, next) => {
    console.error(err.stack); 
    response.status(500).json({ message: 'Server error', error: err.message }); 
});


module.exports = app;
