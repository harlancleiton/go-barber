import { resolve } from 'path';

function appRoot(): string {
  return resolve(__dirname, '..');
}

function tmpPath(): string {
  return resolve(appRoot(), '..', 'tmp');
}

export default { appRoot, tmpPath };
