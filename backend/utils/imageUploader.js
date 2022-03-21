const multer = require('multer');
const AppError = require('./appError');

module.exports = (file, dest, options) => {
    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `static/${dest}`);
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            cb(null, `${options.fileFor}-${Date.now()}.${ext}`);
        }
    });

    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        } else {
            cb(new AppError("Uploaded file must be an Image", 400), false)
        }
    }

    const upload = multer({
        storage: multerStorage,
        fileFilter: multerFilter
    })

    return upload.single(file);
}
