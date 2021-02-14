import express from 'express';

import 'express-async-errors';
import { appConfig } from '~/config/app';
import { uploadConfig } from '~/config/upload';

import { exceptionHandler } from './middlewares';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(appConfig.uploadsRoute, express.static(uploadConfig.directory));

app.use(routes);

app.use(exceptionHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333!');
});
