import { Router } from 'express';

import { appointmentsRouter } from '~/modules/appointments/infra/http';
import {
  authRouter,
  ensureAuthenticated,
  passwordRouter,
  usersRouter
} from '~/modules/users/infra/http';

import { convertEmptyStringsToNull } from '../middlewares';

export const routes = Router();

routes.use(convertEmptyStringsToNull);

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);

routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);
