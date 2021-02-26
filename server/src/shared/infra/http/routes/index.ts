import { Router } from 'express';

import {
  appointmentsRouter,
  providersRouter
} from '~/modules/appointments/infra/http';
import {
  authRouter,
  meRouter,
  passwordRouter,
  usersRouter
} from '~/modules/users/infra/http';

import { convertEmptyStringsToNull } from '../middlewares';

export const routes = Router();

routes.use(convertEmptyStringsToNull);

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/me', meRouter);
routes.use('/password', passwordRouter);

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
