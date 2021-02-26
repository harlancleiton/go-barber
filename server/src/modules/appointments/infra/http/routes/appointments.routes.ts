import { Router } from 'express';

import { ensureAuthenticated } from '~/modules/users/infra/http';

import { AppointmentsController } from '../controllers';

export const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', appointmentsController.index);

appointmentsRouter.post('/', appointmentsController.store);
