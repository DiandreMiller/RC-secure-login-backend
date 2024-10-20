'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: [8, 32],
                }
            },
            failedLoginAttempts: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            lastFailedLogin: {
                type: Sequelize.DATE,
                allowNull: true
            },
            accountLocked: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            dateOfBirth: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    isDate: true, 
                }
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
