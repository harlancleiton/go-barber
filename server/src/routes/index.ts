import { Router } from 'express';

import { convertEmptyStringsToNull } from '~/middlewares';

import { appointmentsRouter } from './appointments.routes';
import { usersRouter } from './users.routes';

export const routes = Router();

routes.use(convertEmptyStringsToNull);

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
