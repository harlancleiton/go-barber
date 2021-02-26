import { Router } from 'express';

import { ensureAuthenticated } from '~/modules/users/infra/http';

import { ProvidersController } from '../controllers';

export const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
