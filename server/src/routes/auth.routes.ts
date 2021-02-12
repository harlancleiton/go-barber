import { Router } from 'express';

import { UsersRepository } from '~/repositories/UsersRepository';
import { AuthenticateUserService } from '~/services/AuthenticateUserService';

export const authRouter = Router();

authRouter.post('/login', async (request, response) => {
  try {
    const usersRepository = new UsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      usersRepository
    );

    const { email, password } = request.body;

    const {
      user,
      token,
      refreshToken
    } = await authenticateUserService.execute({ email, password });

    return response.json({
      user,
      token,
      refreshToken
    });
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});
