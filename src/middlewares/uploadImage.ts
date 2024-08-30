import multer from 'multer';
import path from 'node:path';

export default multer({
  storage: multer.diskStorage({
    destination(request, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(request, file, cb) {
      cb(null, file.originalname.trim());
    },
  }),
  fileFilter: (request, file, cb) => {
    const imgFormatsAllowed = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/webp'
    ];

    if (imgFormatsAllowed.includes(file.mimetype)) cb(null, true);
    else {
      cb(null, false);
      request.body.multerError = 'a imagem tem que ser do tipo png jpg e jpeg ';
    }
  },
}).array('image', 1);
