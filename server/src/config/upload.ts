import crypto from 'crypto';
import multer from 'multer';

import { pathHelpers } from '~/shared/helpers/path';

interface UploadConfig {
  directory: string;
  storage: multer.StorageEngine;
}

const directory = pathHelpers.tmpPath();

export const uploadConfig: UploadConfig = {
  directory,
  storage: multer.diskStorage({
    destination: directory,
    filename: (request, file, callback) => {
      const randomString = crypto.randomBytes(16).toString('hex');

      const [ext, ...originalnames] = file.originalname.split('.').reverse();
      const originalname = originalnames.reverse().toString().replace(',', '-');

      const filename = `${originalname}-${randomString}.${ext}`;

      callback(null, filename);
    }
  })
};
