import express from 'express';

import './database';
import routes from './routes';
import { path } from './helpers';

const app = express();

app.use(express.json());

app.use('/files', express.static(path.tmpPath()));

app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333');
});
