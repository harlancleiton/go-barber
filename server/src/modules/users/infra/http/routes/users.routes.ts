import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import { uploadConfig } from '../../../../../config';
import { CreateUserService, UpdateUserAvatarService } from '../../../services';
import { ensureAuthenticated } from '../middlewares';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const uploadUserAvatar = container.resolve(UpdateUserAvatarService);

    await uploadUserAvatar.execute({
      user_id: request.auth?.userPrimaryKey as string,
      avatarFilename: request.file.filename,
    });

    return response.status(204).json();
  },
);

export { usersRouter };
