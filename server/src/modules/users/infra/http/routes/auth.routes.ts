import { Router } from 'express';

import { LoginController } from '../controllers';

export const authRouter = Router();

const loginController = new LoginController();

authRouter.post('/login', loginController.store);
