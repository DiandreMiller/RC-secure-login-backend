'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//Establish a belongsTo relationship between Movie and User models
class Movie extends Model {
    static associate(models) {
        Movie.belongsTo(models.User, { foreignKey: 'userId' });
    }
}

Movie.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    runtime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        sequelize,
        modelName: 'Movie',
        timestamps: false
    });

module.exports = Movie;