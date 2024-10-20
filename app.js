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