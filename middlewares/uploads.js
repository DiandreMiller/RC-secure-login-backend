const multer = require('multer');
const path = require('path');

//Mutler storage configuration
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (requst, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage})

module.exports = upload;