import { Router } from 'express';

import { appointmentsRouter } from '~/modules/appointments/infra/http';
import {
  authRouter,
  ensureAuthenticated,
  usersRouter
} from '~/modules/users/infra/http';

import { convertEmptyStringsToNull } from '../middlewares';

export const routes = Router();

routes.use(convertEmptyStringsToNull);

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);

routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);
