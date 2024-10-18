//Dependencies
const express = require('express');
const cors = require('cors');
const redis = require('redis');
const sequelize = require('sequelize');

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

app.use('/sign-in', signInController);
app.use('/sign-up', signUpController);
app.use('/movies', moviesController);

app.get('*', (request, response) => {
    response.status(404).send('Page not found');
})

module.exports = app;