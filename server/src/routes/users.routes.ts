import { Router } from 'express';

import { ensureAuthenticated, uploadFile } from '~/middlewares';
import { UsersRepository } from '~/repositories/UsersRepository';
import { CreateUserService } from '~/services/CreateUserService';
import { UpdateAvatarService } from '~/services/UpdateAvatarService';

export const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { firstname, lastname, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({
      firstname,
      lastname,
      email,
      password
    });

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.use(ensureAuthenticated);

usersRouter.patch(
  '/avatar',
  uploadFile('avatar'),
  async (request, response) => {
    try {
      const usersRepository = new UsersRepository();
      const updateUserAvatarService = new UpdateAvatarService(usersRepository);

      const { file, auth } = request;
      // @ts-ignore
      const { user } = auth;

      await updateUserAvatarService.execute({
        user,
        avatar: { filename: file.filename }
      });

      return response.status(204).json();
    } catch (error) {}
  }
);
