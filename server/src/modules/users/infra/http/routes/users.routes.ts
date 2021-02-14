import { Router } from 'express';

import { UsersRepository } from '~/modules/users/infra/typeorm';
import {
  CreateUserService,
  UpdateUserAvatarService
} from '~/modules/users/services';
import { uploadFile } from '~/shared/infra/http/middlewares';

import { ensureAuthenticated } from '../middlewares';

export const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
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
});

usersRouter.use(ensureAuthenticated);

usersRouter.patch(
  '/avatar',
  uploadFile('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository
    );

    const { file, auth } = request;
    // @ts-ignore
    const { user } = auth;

    await updateUserAvatarService.execute({
      user,
      avatar: { filename: file.filename }
    });

    return response.status(204).json();
  }
);
