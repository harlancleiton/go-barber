import { Router } from 'express';

import { convertEmptyStringsToNull } from '~/middlewares';

import { appointmentsRouter } from './appointments.routes';

export const routes = Router();

routes.use(convertEmptyStringsToNull);

routes.use('/appointments', appointmentsRouter);
