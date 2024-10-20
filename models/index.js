'use strict';

const User = require('./userModels');
const Movie = require('./movieModels');

const models = { User, Movie };

if(User.associate) {
    User.associate(models);
}   

if(Movie.associate) {
    Movie.associate(models);
}

module.exports = models;