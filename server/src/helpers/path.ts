import path from 'path';

import { appConfig } from '~/config/app';

interface PathHelpers {
  appRoot: () => string;
  tmpPath: () => string;
  uploadsPath: () => string;
}

function appRoot(): string {
  return process.cwd();
}

function tmpPath(): string {
  const tmpFolder = appConfig.paths.tmpFolder;

  return path.resolve(appRoot(), tmpFolder);
}

function uploadsPath(): string {
  const uploadFolder = appConfig.paths.uploadsFolder;

  if (uploadFolder.concatWithTmpFolder)
    return path.resolve(appRoot(), tmpPath(), uploadFolder.path);

  return path.resolve(appRoot(), uploadFolder.path);
}

export const pathHelpers: PathHelpers = {
  appRoot,
  tmpPath,
  uploadsPath
};
