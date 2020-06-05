import { getCustomRepository } from 'typeorm';
import { join } from 'path';
import fs from 'fs';

import { upload as uploadConfig } from '../config';
import { UsersRepository } from '../repositories';
import { User } from '../models';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) throw Error('Only authenticated users can change avatar');

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
