const { Sequelize, Op } = require('sequelize');

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

// module.exports = sequelize;

module.exports = { sequelize, Op };


// const { Sequelize, DataTypes, Op } = require('sequelize'); // Import Op along with Sequelize

// let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: 'postgres',
//     port: process.env.DB_PORT || 5432
// });

// // Check if DATABASE_URL is set
// if (process.env.DATABASE_URL) {
//     sequelize = new Sequelize(process.env.DATABASE_URL, {
//         dialect: 'postgres',
//         protocol: 'postgres',
//         port: process.env.DB_PORT || 5432,
//         host: process.env.DB_HOST || 'localhost',
//     });
// }

// // Export sequelize and Op
// module.exports = { sequelize, Op }; // Export both sequelize and Op
