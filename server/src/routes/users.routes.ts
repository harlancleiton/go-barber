import { Router } from 'express';

import { UsersRepository } from '~/repositories/UsersRepository';
import { CreateUserService } from '~/services/CreateUserService';

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
