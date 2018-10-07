const multer = require('multer');
const path = require('path');
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    cb(new Error('Bad extensions'));
  } else {
    cb(null, true);
  }
};
const limits = {
  fileSize: 10000000
};
const upload = multer({
  fileFilter,
  limits
}).single('avatar');
module.exports = upload;