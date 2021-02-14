import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '~/modules/users/services';

export class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const { file, auth } = request;

    if (!auth) return response.status(401).json();

    const { user } = auth;

    await updateUserAvatarService.execute({
      user,
      avatar: { filename: file.filename }
    });

    return response.status(204).json();
  }
}
