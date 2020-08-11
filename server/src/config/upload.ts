import { randomBytes } from 'crypto';
import multer from 'multer';

import { tmpPath } from '../shared/helpers';

export const uploadConfig = {
  directory: tmpPath(),
  storage: multer.diskStorage({
    destination: tmpPath(),
    filename: (request, file, callback) => {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
