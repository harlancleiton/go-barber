import { randomBytes } from 'crypto';
import multer from 'multer';

import { path } from '../helpers';

export default {
  directory: path.tmpPath(),
  storage: multer.diskStorage({
    destination: path.tmpPath(),
    filename: (request, file, callback) => {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
