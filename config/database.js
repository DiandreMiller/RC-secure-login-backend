const { Sequelize } = require('sequelize');

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
});

if(process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: process.env.DB_PORT || 5432,
        host: process.env.DB_HOST || 'localhost',
    });
}

module.exports = sequelize;