'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const { v4: uuidv4 } = require('uuid');

class User extends Model {}

// Define the User model
User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4()
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [60, 500],
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true, 
        validate: {
            is: /^\+?[1-9]\d{1,14}$/ 
        }
    },
    failedLoginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lastFailedLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    accountLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true, 
        }
    },
    
    // is2FAEnabled: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false,
    // },
    // twoFactorSecret: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    // backupCodes: {
    //     type: DataTypes.JSON,
    //     allowNull: true,
    // }
}, {
    sequelize,               
    modelName: 'User',        
    tableName: 'users',       
    timestamps: true,        
});

module.exports = User;
