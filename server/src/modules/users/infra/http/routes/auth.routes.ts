import { Router } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '../../../services';

const authRouter = Router();

authRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return response.status(201).json({ user, token });
});

export { authRouter };
