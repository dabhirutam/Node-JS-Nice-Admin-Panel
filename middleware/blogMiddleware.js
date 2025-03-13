const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {        
        cb(null, 'uploads/blogImgs');
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
        cb(null, filename)
    }
})

const blogImgs = multer({storage});

module.exports = blogImgs;