const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profileImgs');
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
        cb(null, filename)
    }
})

const profileImgs = multer({storage});

module.exports = profileImgs;