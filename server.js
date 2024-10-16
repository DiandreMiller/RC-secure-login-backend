//Dependency
const app = require('./app');

//Configuration
require('dotenv').config();

//PORT
const PORT = process.env.PORT || 3000;

//Listen
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})