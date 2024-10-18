const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    failedLoginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lastFailedLogin: {
        type: DataTypes.DATE
    },
    accountLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;