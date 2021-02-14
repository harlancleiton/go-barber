import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '~/modules/users/services';

export class UsersController {
  async store(request: Request, response: Response): Promise<Response> {
    const { firstname, lastname, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      firstname,
      lastname,
      email,
      password
    });

    return response.status(201).json(user);
  }
}
