import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../../../../../config';
import { UsersController, UserAvatarController } from '../controllers';
import { ensureAuthenticated } from '../middlewares';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.store);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export { usersRouter };
