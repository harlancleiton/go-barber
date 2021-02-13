import { Router } from 'express';

import { convertEmptyStringsToNull, ensureAuthenticated } from '~/middlewares';

import { appointmentsRouter } from './appointments.routes';
import { authRouter } from './auth.routes';
import { usersRouter } from './users.routes';

export const routes = Router();

routes.use(convertEmptyStringsToNull);

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);

routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);
