import { RequestHandler } from 'express';
import multer from 'multer';

import { uploadConfig } from '~/config/upload';

type UploadFileType = 'single' | 'array' | 'none';

const multerInstance = multer(uploadConfig);

export function uploadFile(
  name: string,
  type: UploadFileType = 'single'
): RequestHandler {
  switch (type) {
    case 'single':
      return multerInstance.single(name);
    case 'array':
      return multerInstance.array(name);
    case 'none':
      return multerInstance.none();
    default:
      throw new Error('UploadTypeFile is invalid');
  }
}
