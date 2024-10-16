//Dependencies
const express = require('express');
const cors = require('cors');

//Configuration
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (request, response) => {
    response.send('Welcome to my red canary security challenge');
})

module.exports = app;