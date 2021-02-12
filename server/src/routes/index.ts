import { Router } from 'express';

import { convertEmptyStringsToNull } from '~/middlewares';

import { appointmentsRouter } from './appointments.routes';
import { authRouter } from './auth.routes';
import { usersRouter } from './users.routes';

export const routes = Router();

routes.use(convertEmptyStringsToNull);

routes.use('/appointments', appointmentsRouter);
routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
