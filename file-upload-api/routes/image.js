import multer from 'multer'
import imageService from '../services/image';

var express = require('express');
var router = express.Router();

/* POST image classification. */
router.post('/',
  upload.single('image'),
  function(req, res, next) {
    // res.render('index', { title: 'Express' });
    try {
      const response = await imageService.processImage(req.file.filename);
      res.status(HTTP_CODES.OK).json(response);
    } catch (error) {
      res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json(error);
    }
});

var imageDir = './tmp'
if (!fs.existsSync(imageDir)){
  fs.mkdirSync(imageDir);
}

const storage = multer.diskStorage({
  // where you want to store the file; creates the dir
  destination: function(req, file, cb) {
    cb(null, imageDir);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true) // will keep the file
  // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //   cb(null, true) // will keep the file
  // } else {
  //   cb(new Error('Image must be JPEG/PNG'), false) // will ignore the file
  // }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


module.exports = router;
