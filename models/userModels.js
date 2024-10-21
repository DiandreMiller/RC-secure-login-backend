'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const {v4: uuidv4} = require('uuid');

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
            len: [60, 200],
            containsSpecialCharacters(value) {
                const specialCharactersPattern = /[!@#$%^&*(),.?":{}|<>]/;
                if(!specialCharactersPattern.test(value)) {
                    throw new Error('Password must contain at least one special character');
                }
            }
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
    }
}, {
    sequelize,               
    modelName: 'User',        
    tableName: 'users',       
    timestamps: true,        
});


module.exports = User;
