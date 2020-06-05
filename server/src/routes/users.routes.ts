import { Router } from 'express';
import multer from 'multer';

import { CreateUserService, UploadUserAvatarService } from '../services';
import { ensureAuthenticated } from '../middlewares';
import { upload as uploadConfig } from '../config';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const uploadUserAvatar = new UploadUserAvatarService();

      await uploadUserAvatar.execute({
        user_id: request.auth?.userPrimaryKey as string,
        avatarFilename: request.file.filename,
      });

      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
