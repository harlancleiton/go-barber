import fs from 'fs';
import { join } from 'path';

import { uploadConfig } from '~/config/upload';
import { User } from '~/entities/User';
import { UsersRepository } from '~/repositories/UsersRepository';

interface ServiceRequest {
  user: User;
  avatar: { filename: string };
}

export class UpdateAvatarService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ avatar, user }: ServiceRequest): Promise<void> {
    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatar.filename;
    await this.usersRepository.save(user);
  }
}
