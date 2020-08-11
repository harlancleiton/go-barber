import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import '../typeorm';
import { GoBarberException } from '../../exceptions';
import { path } from '../../helpers';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(path.tmpPath()));

app.use(routes);

app.use(
  (
    error: Error | GoBarberException,
    request: Request,
    response: Response,
    _: NextFunction,
  ) => {
    if (error instanceof GoBarberException)
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  },
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333');
});
