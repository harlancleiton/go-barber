import fs from 'fs';
import { join } from 'path';

import { upload as uploadConfig } from '../../../config';
import { GoBarberException } from '../../../shared/exceptions';
import { User } from '../infra/typeorm/entities';
import { IUsersRepository } from '../repositories';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new GoBarberException(
        'Only authenticated users can change avatar',
        401,
      );

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}
