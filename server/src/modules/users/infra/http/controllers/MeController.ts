import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  FindProfileService,
  UpdateUserService
} from '~/modules/users/services';

export class MeController {
  async show(request: Request, response: Response): Promise<Response> {
    if (!request.auth) return response.status(401).json();

    const { user } = request.auth;

    const findProfileService = container.resolve(FindProfileService);

    const profile = await findProfileService.execute({ user });

    return response.json(profile);
  }

  async update(request: Request, response: Response): Promise<Response> {
    if (!request.auth) return response.status(401).json();

    const { firstname, lastname, email, password } = request.body;
    const { user } = request.auth;

    const updateUserService = container.resolve(UpdateUserService);

    await updateUserService.execute({
      id: user.id,
      firstname,
      lastname,
      email,
      password
    });

    return response.status(204).json();
  }
}
