import path from 'path';
import crypto from 'crypto'; // gera hashs
import multer from 'multer'; // permite trabalhar com imagens

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpPath,

  storage: multer.diskStorage({
    destination: tmpPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
