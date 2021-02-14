import { Router } from 'express';

import { uploadFile } from '~/shared/infra/http/middlewares';

import { UserAvatarController, UsersController } from '../controllers';
import { ensureAuthenticated } from '../middlewares';

export const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.store);

usersRouter.use(ensureAuthenticated);

usersRouter.patch('/avatar', uploadFile('avatar'), userAvatarController.update);
