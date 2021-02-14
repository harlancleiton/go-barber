import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '~/modules/users/services';

export class LoginController {
  async store(request: Request, response: Response): Promise<Response> {
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { email, password } = request.body;

    const { user, token, refreshToken } = await authenticateUserService.execute(
      {
        email,
        password
      }
    );

    return response.json({
      user,
      token,
      refreshToken
    });
  }
}
