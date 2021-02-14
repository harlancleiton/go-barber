import { Router } from 'express';

import { UserRepository } from '~/modules/users/infra/typeorm';
import { AuthenticateUserService } from '~/modules/users/services';

export const authRouter = Router();

authRouter.post('/login', async (request, response) => {
  const usersRepository = new UserRepository();
  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { email, password } = request.body;

  const { user, token, refreshToken } = await authenticateUserService.execute({
    email,
    password
  });

  return response.json({
    user,
    token,
    refreshToken
  });
});
