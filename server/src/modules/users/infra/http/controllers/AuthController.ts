import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '../../../services';

export class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.status(201).json({ user, token });
  }
}
