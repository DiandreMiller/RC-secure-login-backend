'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('login_attempts', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: true, 
                references: {
                    model: 'users', 
                    key: 'id',
                },
                onUpdate: 'CASCADE', 
                onDelete: 'SET NULL', 
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            attempt_time: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false, 
                validate: {
                    isIn: [['success', 'failure']], 
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
        await queryInterface.dropTable('login_attempts');
    }
};
