import { Router } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '~/modules/users/services';

export const authRouter = Router();

authRouter.post('/login', async (request, response) => {
  const authenticateUserService = container.resolve(AuthenticateUserService);

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
