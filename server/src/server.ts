import express from 'express';

import { appConfig } from './config/app';
import { uploadConfig } from './config/upload';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(appConfig.uploadsRoute, express.static(uploadConfig.directory));

app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333!');
});
