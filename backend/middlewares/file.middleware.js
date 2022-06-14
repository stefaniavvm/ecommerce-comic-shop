const multer = require('multer');
const path = require('path');
//const fs = require('fs');
const cloudinary = require('cloudinary').v2;


const storage = multer.diskStorage({
  filename: (req, file, cd) => {
    cd(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cd) => {
    cd(null, path.join(__dirname, ' '));
  },
  //Es para guardar imagenes
});

const VALID_FILE_TYPES = ['image/png', 'image/pnj', 'image/jpeg'];


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if(!VALID_FILE_TYPES.includes(file.mimetype)) {
      cb(new Error('Tipo de archivo no soportado'));
    } else {
      cb(null, true);
     }
  },
});

const uploadCloudinary = async (req, res, next) => {
  if (req.file) {
    try {
      const image = await cloudinary.uploader.upload(filePath);
      req.file_url = image.secure_url;
      return next();
    } catch (error) {
      return next(error);
    }

  } else {
    return next();
  }
}

 

module.exports = { upload, uploadCloudinary }; 