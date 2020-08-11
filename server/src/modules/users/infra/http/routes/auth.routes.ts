import { Router } from 'express';

import { AuthenticateUserService } from '../../../services';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

const authRouter = Router();

authRouter.post('/login', async (request, response) => {
  const usersRepository = new UsersRepository();

  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return response.status(201).json({ user, token });
});

export { authRouter };
