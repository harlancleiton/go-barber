import { Router } from 'express';
import multer from 'multer';

import { upload as uploadConfig } from '../../../../../config';
import { CreateUserService, UploadUserAvatarService } from '../../../services';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import { ensureAuthenticated } from '../middlewares';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();

  const { name, email, password } = request.body;

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const uploadUserAvatar = new UploadUserAvatarService(usersRepository);

    await uploadUserAvatar.execute({
      user_id: request.auth?.userPrimaryKey as string,
      avatarFilename: request.file.filename,
    });

    return response.status(204).json();
  },
);

export default usersRouter;
