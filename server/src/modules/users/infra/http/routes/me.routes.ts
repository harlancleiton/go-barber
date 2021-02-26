import { Router } from 'express';

import { MeController } from '../controllers';
import { ensureAuthenticated } from '../middlewares';

export const meRouter = Router();

const meController = new MeController();

meRouter.use(ensureAuthenticated);

meRouter.put('/', meController.update);
meRouter.get('/', meController.show);
