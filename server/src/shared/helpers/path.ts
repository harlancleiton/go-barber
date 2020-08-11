import { resolve } from 'path';

function appRoot(): string {
  return resolve(process.cwd(), 'src');
}

function tmpPath(): string {
  return resolve(appRoot(), '..', 'tmp');
}

export { appRoot, tmpPath };
