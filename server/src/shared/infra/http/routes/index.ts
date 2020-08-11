import { Router } from 'express';

import { appointmentsRouter } from '../../../../modules/appoitments';
import { authRouter, usersRouter } from '../../../../modules/users';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);

routes.use('/auth', authRouter);

export { routes };
