import fs from 'fs';
import path from 'path';

import { GoBarberException } from '~/shared/exceptions';
import { pathHelpers } from '~/shared/helpers/path';

import { IStorageProvider } from '../IStorageProvider';

export class DiskStorageProvider implements IStorageProvider {
  async save(file: string): Promise<string> {
    try {
      const tmpFilePath = path.resolve(pathHelpers.tmpPath(), file);
      await fs.promises.stat(tmpFilePath);
      const uploadFilePath = path.resolve(pathHelpers.uploadsPath(), file);
      fs.promises.rename(tmpFilePath, uploadFilePath);

      return file;
    } catch (error) {
      throw new GoBarberException('File not found', 404);
    }
  }

  async delete(file: string): Promise<void> {
    try {
      const filePath = path.resolve(pathHelpers.uploadsPath(), file);
      await fs.promises.stat(filePath);
      fs.promises.unlink(filePath);
    } catch (error) {
      throw new GoBarberException('File not found', 404);
    }
  }
}
