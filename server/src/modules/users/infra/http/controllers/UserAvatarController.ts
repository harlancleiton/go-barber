import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '../../../services';

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const uploadUserAvatar = container.resolve(UpdateUserAvatarService);

    await uploadUserAvatar.execute({
      user_id: request.auth?.userPrimaryKey as string,
      avatarFilename: request.file.filename,
    });

    return response.status(204).json();
  }
}
