// Configuration
require('dotenv').config();
const session = require('express-session'); 
const app = require('./app');
const { sequelize } = require('./config/database');

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-default-secret', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } 
}));

// PORT
const PORT = process.env.PORT || 3000;

// Sync database and listen for requests
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been successfully established');
        return sequelize.sync(); // Sync models with database
    })
    // Listen
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
